import {
    Component,
    ElementRef,
    Renderer,
    ContentChildren,
    QueryList,
    Input
} from '@angular/core';

import {
    trigger,
    style,
    transition,
    animate,
    keyframes,
    state
} from '@angular/animations';

import { ACTIONS, arrowKeysHandler } from './actions';

import { Ng2MenuItem } from '../menu-item/ng2-menu-item';
import { DropdownStateService } from '../../services/dropdown-state.service';

@Component({
    selector: 'ng2-dropdown-menu',
    styleUrls: [ './style.scss' ],
    templateUrl: './template.html',
    animations: [
        trigger('fade', [
            state('visible', style(
                {display: 'block', opacity: 1, height: '*', width: '*'}
            )),
            state('hidden', style(
                {display: 'none', opacity: 0, overflow: 'hidden', height: 0, width: 0}
            )),
            transition('hidden => visible', [
                animate('250ms ease-in',
                    style({opacity: 1, height: '*', width: '*'})
                )
            ]),
            transition('visible => hidden', [
                animate('350ms ease-out',
                    style({opacity: 0, width: 0, height: 0})
                )
            ])
        ]),
        trigger('opacity', [
            transition('hidden => visible', [
                animate('450ms ease-in', keyframes([
                    style({opacity: 0, offset: 0}),
                    style({opacity: 1, offset: 1}),
                ]))
            ]),
            transition('visible => hidden', [
                animate('250ms ease-out', keyframes([
                    style({opacity: 1, offset: 0}),
                    style({opacity: 0.5, offset: 0.3}),
                    style({opacity: 0, offset: 1}),
                ]))
            ])
        ])
    ]
})
export class Ng2DropdownMenu {
    /**
     * @name width
     */
    @Input() public width: number = 4;

    /**
     * @description if set to true, the first element of the dropdown will be automatically focused
     * @name focusFirstElement
     */
    @Input() public focusFirstElement: boolean = true;

    /**
     * @description sets dropdown offset from the button
     * @name offset {string} follow format '<number> <number>' ex. '0 20'
     */
    @Input() public offset: string;

    /**
     * @name appendToBody
     */
    @Input() public appendToBody: boolean = true;

    /**
     * @name zIndex
     */
    @Input() public zIndex = 1000;

    /**
     * @name items
     */
    @ContentChildren(Ng2MenuItem, { descendants: true }) public items: QueryList<Ng2MenuItem>;

    private position: ClientRect;

    private listeners: { arrowHandler?: Function, handleKeypress?: Function } = {
        arrowHandler: undefined,
        handleKeypress: undefined
    };

    constructor(public state: DropdownStateService,
                private element: ElementRef,
                private renderer: Renderer) {}

    /**
     * @name show
     * @shows menu and selects first item
     */
    public show(position?: ClientRect, dynamic = true): void {
        const dc = typeof document !== 'undefined' ? document : undefined;
        const wd = typeof window !== 'undefined' ? window : undefined;

        if (!this.state.menuState.isVisible) {
            // setting handlers
            if (dc) {
                this.listeners.handleKeypress = this.renderer
                    .listen(dc.body, 'keydown', this.handleKeypress.bind(this));
            }

            this.listeners.arrowHandler = this.renderer.listen(wd, 'keydown', arrowKeysHandler);
        }

        // update state
        this.state.menuState.isVisible = true;

        if (position) {
            this.updatePosition(position, dynamic);
        }
    }

    /**
     * @name hide
     * @desc hides menu
     */
    public hide(): void {
        this.state.menuState.isVisible = false;

        // reset selected item state
        this.state.dropdownState.unselect();

        // call function to unlisten
        if (this.listeners.arrowHandler) {
            this.listeners.arrowHandler();
        }

        if (this.listeners.handleKeypress) {
            this.listeners.handleKeypress();
        }
    }

    /**
     * @name updatePosition
     * @desc updates the menu position every time it is toggled
     * @param position {ClientRect}
     * @param dynamic {boolean}
     */
    public updatePosition(position: ClientRect, dynamic: boolean): void {
        this.position = position;
        this.updateOnChange(dynamic);
    }

    /**
     * @name handleKeypress
     * @desc executes functions on keyPress based on the key pressed
     * @param $event
     */
    public handleKeypress($event): void {
        const key = $event.keyCode;
        const items = this.items.toArray();
        const index = items.indexOf(this.state.dropdownState.selectedItem!);

        if (!ACTIONS.hasOwnProperty(key)) {
            return;
        }

        ACTIONS[key].call(this, index, items, this.state.dropdownState);
    }

    /**
     * @name getMenuElement
     */
    private getMenuElement(): Element {
        return this.element.nativeElement.children[0];
    }

    /**
     * @name calcPositionOffset
     * @param position
     */
    private calcPositionOffset(position): { top: string, left: string } | undefined {
        const wd = typeof window !== 'undefined' ? window : undefined;
        const dc = typeof document !== 'undefined' ? document : undefined;

        if (!wd || !dc || !position) {
            return;
        }

        const element = this.getMenuElement();
        const supportPageOffset = wd.pageXOffset !== undefined;
        const isCSS1Compat = ((dc.compatMode || '') === 'CSS1Compat');

        const x = supportPageOffset ? wd.pageXOffset : isCSS1Compat ?
            dc.documentElement.scrollLeft : dc.body.scrollLeft;

        const y = supportPageOffset ? wd.pageYOffset : isCSS1Compat ?
            dc.documentElement.scrollTop : dc.body.scrollTop;

        let { top, left } = this.applyOffset(
            `${position.top + (this.appendToBody ? y - 15 : 0)}px`,
            `${position.left + x - 5}px`
        );

        const clientWidth = element.clientWidth;
        const clientHeight = element.clientHeight;

        const marginFromBottom = parseInt(top) + clientHeight + (this.appendToBody ? 0 : y - 15);
        const marginFromRight = parseInt(left) + clientWidth;

        const windowScrollHeight = wd.innerHeight + wd.scrollY;
        const windowScrollWidth = wd.innerWidth + wd.scrollX;

        if (marginFromBottom >= windowScrollHeight) {
            top = `${parseInt(top.replace('px', '')) - clientHeight}px`;
        }

        if (marginFromRight >= windowScrollWidth) {
            const marginRight = marginFromRight - windowScrollWidth + 30;
            left = `${parseInt(left.replace('px', '')) - marginRight}px`;
        }

        return { top, left };
    }

    private applyOffset(top: string, left: string): { top: string, left: string } {
        if (!this.offset) {
            return { top, left };
        }

        const offset = this.offset.split(' ');

        if (!offset[1]) {
            offset[1] = '0';
        }

        top = `${parseInt(top.replace('px', '')) + parseInt(offset[0])}px`;
        left = `${parseInt(left.replace('px', '')) + parseInt(offset[1])}px`;

        return { top, left };
    }

    public ngOnInit() {
        const dc = typeof document !== 'undefined' ? document : undefined;
        if (this.appendToBody && dc) {
            // append menu element to the body
            dc.body.appendChild(this.element.nativeElement);
        }
    }

    public updateOnChange(dynamic = true) {
        const element = this.getMenuElement();
        const position = this.calcPositionOffset(this.position);

        if (position) {
            this.renderer.setElementStyle(element, 'top', position.top.toString());
            this.renderer.setElementStyle(element, 'left', position.left.toString());
        }

        // select first item unless user disabled this option
        if (this.focusFirstElement &&
            this.items.first &&
            !this.state.dropdownState.selectedItem) {
            this.state.dropdownState.select(this.items.first, false);
        }
    }

    public ngOnDestroy() {
        const elem = this.element.nativeElement;
        elem.parentNode.removeChild(elem);

        if (this.listeners.handleKeypress) {
            this.listeners.handleKeypress();
        }
    }
}
