/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Renderer, ContentChildren, QueryList, Input } from '@angular/core';
import { trigger, style, transition, animate, keyframes, state } from '@angular/animations';
import { ACTIONS, arrowKeysHandler } from './actions';
import { Ng2MenuItem } from '../menu-item/ng2-menu-item';
import { DropdownStateService } from '../../services/dropdown-state.service';
export class Ng2DropdownMenu {
    /**
     * @param {?} state
     * @param {?} element
     * @param {?} renderer
     */
    constructor(state, element, renderer) {
        this.state = state;
        this.element = element;
        this.renderer = renderer;
        /**
         * \@name width
         */
        this.width = 4;
        /**
         * \@description if set to true, the first element of the dropdown will be automatically focused
         * \@name focusFirstElement
         */
        this.focusFirstElement = true;
        /**
         * \@name appendToBody
         */
        this.appendToBody = true;
        /**
         * \@name zIndex
         */
        this.zIndex = 1000;
        this.listeners = {
            arrowHandler: undefined,
            handleKeypress: undefined
        };
    }
    /**
     * \@name show
     * \@shows menu and selects first item
     * @param {?=} position
     * @param {?=} dynamic
     * @return {?}
     */
    show(position, dynamic = true) {
        const /** @type {?} */ dc = typeof document !== 'undefined' ? document : undefined;
        const /** @type {?} */ wd = typeof window !== 'undefined' ? window : undefined;
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
     * \@name hide
     * @desc hides menu
     * @return {?}
     */
    hide() {
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
     * \@name updatePosition
     * @desc updates the menu position every time it is toggled
     * @param {?} position {ClientRect}
     * @param {?} dynamic {boolean}
     * @return {?}
     */
    updatePosition(position, dynamic) {
        this.position = position;
        this.updateOnChange(dynamic);
    }
    /**
     * \@name handleKeypress
     * @desc executes functions on keyPress based on the key pressed
     * @param {?} $event
     * @return {?}
     */
    handleKeypress($event) {
        const /** @type {?} */ key = $event.keyCode;
        const /** @type {?} */ items = this.items.toArray();
        const /** @type {?} */ index = items.indexOf(/** @type {?} */ ((this.state.dropdownState.selectedItem)));
        if (!ACTIONS.hasOwnProperty(key)) {
            return;
        }
        ACTIONS[key].call(this, index, items, this.state.dropdownState);
    }
    /**
     * \@name getMenuElement
     * @return {?}
     */
    getMenuElement() {
        return this.element.nativeElement.children[0];
    }
    /**
     * \@name calcPositionOffset
     * @param {?} position
     * @return {?}
     */
    calcPositionOffset(position) {
        const /** @type {?} */ wd = typeof window !== 'undefined' ? window : undefined;
        const /** @type {?} */ dc = typeof document !== 'undefined' ? document : undefined;
        if (!wd || !dc || !position) {
            return;
        }
        const /** @type {?} */ element = this.getMenuElement();
        const /** @type {?} */ supportPageOffset = wd.pageXOffset !== undefined;
        const /** @type {?} */ isCSS1Compat = ((dc.compatMode || '') === 'CSS1Compat');
        const /** @type {?} */ x = supportPageOffset ? wd.pageXOffset : isCSS1Compat ?
            dc.documentElement.scrollLeft : dc.body.scrollLeft;
        const /** @type {?} */ y = supportPageOffset ? wd.pageYOffset : isCSS1Compat ?
            dc.documentElement.scrollTop : dc.body.scrollTop;
        let { top, left } = this.applyOffset(`${position.top + (this.appendToBody ? y - 15 : 0)}px`, `${position.left + x - 5}px`);
        const /** @type {?} */ clientWidth = element.clientWidth;
        const /** @type {?} */ clientHeight = element.clientHeight;
        const /** @type {?} */ marginFromBottom = parseInt(top) + clientHeight + (this.appendToBody ? 0 : y - 15);
        const /** @type {?} */ marginFromRight = parseInt(left) + clientWidth;
        const /** @type {?} */ windowScrollHeight = wd.innerHeight + wd.scrollY;
        const /** @type {?} */ windowScrollWidth = wd.innerWidth + wd.scrollX;
        if (marginFromBottom >= windowScrollHeight) {
            top = `${parseInt(top.replace('px', '')) - clientHeight}px`;
        }
        if (marginFromRight >= windowScrollWidth) {
            const /** @type {?} */ marginRight = marginFromRight - windowScrollWidth + 30;
            left = `${parseInt(left.replace('px', '')) - marginRight}px`;
        }
        return { top, left };
    }
    /**
     * @param {?} top
     * @param {?} left
     * @return {?}
     */
    applyOffset(top, left) {
        if (!this.offset) {
            return { top, left };
        }
        const /** @type {?} */ offset = this.offset.split(' ');
        if (!offset[1]) {
            offset[1] = '0';
        }
        top = `${parseInt(top.replace('px', '')) + parseInt(offset[0])}px`;
        left = `${parseInt(left.replace('px', '')) + parseInt(offset[1])}px`;
        return { top, left };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ dc = typeof document !== 'undefined' ? document : undefined;
        if (this.appendToBody && dc) {
            // append menu element to the body
            dc.body.appendChild(this.element.nativeElement);
        }
    }
    /**
     * @param {?=} dynamic
     * @return {?}
     */
    updateOnChange(dynamic = true) {
        const /** @type {?} */ element = this.getMenuElement();
        const /** @type {?} */ position = this.calcPositionOffset(this.position);
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        const /** @type {?} */ elem = this.element.nativeElement;
        elem.parentNode.removeChild(elem);
        if (this.listeners.handleKeypress) {
            this.listeners.handleKeypress();
        }
    }
}
Ng2DropdownMenu.decorators = [
    { type: Component, args: [{
                selector: 'ng2-dropdown-menu',
                styles: [`:host{display:block}.ng2-dropdown-menu{overflow-y:auto;box-shadow:0 1px 2px 0 rgba(0,0,0,.3);position:absolute;padding:.5em 0;background:#fff;border-radius:1px;max-height:400px;width:260px;min-height:0;display:block}.ng2-dropdown-menu.ng2-dropdown-menu--inside-element{position:fixed}.ng2-dropdown-menu.ng2-dropdown-menu--width--2{width:200px}.ng2-dropdown-menu.ng2-dropdown-menu--width--4{width:260px}.ng2-dropdown-menu.ng2-dropdown-menu--width--6{width:320px}.ng2-dropdown-backdrop{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:hidden}:host /deep/ .ng2-menu-divider{height:1px;min-height:1px;max-height:1px;width:100%;display:block;background:#f9f9f9}`],
                template: `<!-- MENU -->
<div class='ng2-dropdown-menu ng2-dropdown-menu---width--{{ width }}'
     [class.ng2-dropdown-menu--inside-element]="!appendToBody"
     [class.ng2-dropdown-menu--open]="state.menuState.isVisible"
     [style.z-index]="zIndex"
     [@fade]="state.menuState.toString()">
        <div class="ng2-dropdown-menu__options-container"
             [@opacity]="state.menuState.toString()">
            <ng-content></ng-content>
        </div>
</div>

<!-- BACKDROP -->
<div class="ng2-dropdown-backdrop" *ngIf="state.menuState.isVisible" (click)="hide()"></div>
`,
                animations: [
                    trigger('fade', [
                        state('visible', style({ display: 'block', opacity: 1, height: '*', width: '*' })),
                        state('hidden', style({ display: 'none', opacity: 0, overflow: 'hidden', height: 0, width: 0 })),
                        transition('hidden => visible', [
                            animate('250ms ease-in', style({ opacity: 1, height: '*', width: '*' }))
                        ]),
                        transition('visible => hidden', [
                            animate('350ms ease-out', style({ opacity: 0, width: 0, height: 0 }))
                        ])
                    ]),
                    trigger('opacity', [
                        transition('hidden => visible', [
                            animate('450ms ease-in', keyframes([
                                style({ opacity: 0, offset: 0 }),
                                style({ opacity: 1, offset: 1 }),
                            ]))
                        ]),
                        transition('visible => hidden', [
                            animate('250ms ease-out', keyframes([
                                style({ opacity: 1, offset: 0 }),
                                style({ opacity: 0.5, offset: 0.3 }),
                                style({ opacity: 0, offset: 1 }),
                            ]))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
Ng2DropdownMenu.ctorParameters = () => [
    { type: DropdownStateService, },
    { type: ElementRef, },
    { type: Renderer, },
];
Ng2DropdownMenu.propDecorators = {
    "width": [{ type: Input },],
    "focusFirstElement": [{ type: Input },],
    "offset": [{ type: Input },],
    "appendToBody": [{ type: Input },],
    "zIndex": [{ type: Input },],
    "items": [{ type: ContentChildren, args: [Ng2MenuItem, { descendants: true },] },],
};
function Ng2DropdownMenu_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Ng2DropdownMenu.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Ng2DropdownMenu.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    Ng2DropdownMenu.propDecorators;
    /**
     * \@name width
     * @type {?}
     */
    Ng2DropdownMenu.prototype.width;
    /**
     * \@description if set to true, the first element of the dropdown will be automatically focused
     * \@name focusFirstElement
     * @type {?}
     */
    Ng2DropdownMenu.prototype.focusFirstElement;
    /**
     * \@description sets dropdown offset from the button
     * \@name offset {string} follow format '<number> <number>' ex. '0 20'
     * @type {?}
     */
    Ng2DropdownMenu.prototype.offset;
    /**
     * \@name appendToBody
     * @type {?}
     */
    Ng2DropdownMenu.prototype.appendToBody;
    /**
     * \@name zIndex
     * @type {?}
     */
    Ng2DropdownMenu.prototype.zIndex;
    /**
     * \@name items
     * @type {?}
     */
    Ng2DropdownMenu.prototype.items;
    /** @type {?} */
    Ng2DropdownMenu.prototype.position;
    /** @type {?} */
    Ng2DropdownMenu.prototype.listeners;
    /** @type {?} */
    Ng2DropdownMenu.prototype.state;
    /** @type {?} */
    Ng2DropdownMenu.prototype.element;
    /** @type {?} */
    Ng2DropdownMenu.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWRyb3Bkb3duLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vIiwic291cmNlcyI6WyJzcmMvbW9kdWxlcy9jb21wb25lbnRzL21lbnUvbmcyLWRyb3Bkb3duLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsRUFDUixlQUFlLEVBQ2YsU0FBUyxFQUNULEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFNBQVMsRUFDVCxLQUFLLEVBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQXdEN0UsTUFBTTs7Ozs7O0lBd0NGLFlBQW1CLEtBQTJCLEVBQzFCLFNBQ0E7UUFGRCxVQUFLLEdBQUwsS0FBSyxDQUFzQjtRQUMxQixZQUFPLEdBQVAsT0FBTztRQUNQLGFBQVEsR0FBUixRQUFROzs7O3FCQXRDSSxDQUFDOzs7OztpQ0FNWSxJQUFJOzs7OzRCQVdULElBQUk7Ozs7c0JBS25CLElBQUk7eUJBUytDO1lBQ3hFLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLGNBQWMsRUFBRSxTQUFTO1NBQzVCO0tBSXlDOzs7Ozs7OztJQU1uQyxJQUFJLENBQUMsUUFBcUIsRUFBRSxPQUFPLEdBQUcsSUFBSTtRQUM3Qyx1QkFBTSxFQUFFLEdBQUcsT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNsRSx1QkFBTSxFQUFFLEdBQUcsT0FBTyxNQUFN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LEVBQUMsQ0FBQztnQ0FDbEMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7NkJBQ2pDLENBQUMsQ0FBQzt5QkFDTixDQUFDO3FCQUNMLENBQUM7aUJBQ0w7YUFDSjs7OztZQXZEUSxvQkFBb0I7WUFuQnpCLFVBQVU7WUFDVixRQUFROzs7c0JBOEVQLEtBQUs7a0NBTUwsS0FBSzt1QkFNTCxLQUFLOzZCQUtMLEtBQUs7dUJBS0wsS0FBSztzQkFLTCxlQUFlLFNBQUMsV0FBVyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUmVuZGVyZXIsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgICB0cmlnZ2VyLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgYW5pbWF0ZSxcbiAgICBrZXlmcmFtZXMsXG4gICAgc3RhdGVcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7IEFDVElPTlMsIGFycm93S2V5c0hhbmRsZXIgfSBmcm9tICcuL2FjdGlvbnMnO1xuXG5pbXBvcnQgeyBOZzJNZW51SXRlbSB9IGZyb20gJy4uL21lbnUtaXRlbS9uZzItbWVudS1pdGVtJztcbmltcG9ydCB7IERyb3Bkb3duU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZHJvcGRvd24tc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmcyLWRyb3Bkb3duLW1lbnUnLFxuICAgIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrfS5uZzItZHJvcGRvd24tbWVudXtvdmVyZmxvdy15OmF1dG87Ym94LXNoYWRvdzowIDFweCAycHggMCByZ2JhKDAsMCwwLC4zKTtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nOi41ZW0gMDtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyLXJhZGl1czoxcHg7bWF4LWhlaWdodDo0MDBweDt3aWR0aDoyNjBweDttaW4taGVpZ2h0OjA7ZGlzcGxheTpibG9ja30ubmcyLWRyb3Bkb3duLW1lbnUubmcyLWRyb3Bkb3duLW1lbnUtLWluc2lkZS1lbGVtZW50e3Bvc2l0aW9uOmZpeGVkfS5uZzItZHJvcGRvd24tbWVudS5uZzItZHJvcGRvd24tbWVudS0td2lkdGgtLTJ7d2lkdGg6MjAwcHh9Lm5nMi1kcm9wZG93bi1tZW51Lm5nMi1kcm9wZG93bi1tZW51LS13aWR0aC0tNHt3aWR0aDoyNjBweH0ubmcyLWRyb3Bkb3duLW1lbnUubmcyLWRyb3Bkb3duLW1lbnUtLXdpZHRoLS02e3dpZHRoOjMyMHB4fS5uZzItZHJvcGRvd24tYmFja2Ryb3B7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDoxO292ZXJmbG93OmhpZGRlbn06aG9zdCAvZGVlcC8gLm5nMi1tZW51LWRpdmlkZXJ7aGVpZ2h0OjFweDttaW4taGVpZ2h0OjFweDttYXgtaGVpZ2h0OjFweDt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZDojZjlmOWY5fWBdLFxuICAgIHRlbXBsYXRlOiBgPCEtLSBNRU5VIC0tPlxuPGRpdiBjbGFzcz0nbmcyLWRyb3Bkb3duLW1lbnUgbmcyLWRyb3Bkb3duLW1lbnUtLS13aWR0aC0te3sgd2lkdGggfX0nXG4gICAgIFtjbGFzcy5uZzItZHJvcGRvd24tbWVudS0taW5zaWRlLWVsZW1lbnRdPVwiIWFwcGVuZFRvQm9keVwiXG4gICAgIFtjbGFzcy5uZzItZHJvcGRvd24tbWVudS0tb3Blbl09XCJzdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlXCJcbiAgICAgW3N0eWxlLnotaW5kZXhdPVwiekluZGV4XCJcbiAgICAgW0BmYWRlXT1cInN0YXRlLm1lbnVTdGF0ZS50b1N0cmluZygpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZzItZHJvcGRvd24tbWVudV9fb3B0aW9ucy1jb250YWluZXJcIlxuICAgICAgICAgICAgIFtAb3BhY2l0eV09XCJzdGF0ZS5tZW51U3RhdGUudG9TdHJpbmcoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIEJBQ0tEUk9QIC0tPlxuPGRpdiBjbGFzcz1cIm5nMi1kcm9wZG93bi1iYWNrZHJvcFwiICpuZ0lmPVwic3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZVwiIChjbGljayk9XCJoaWRlKClcIj48L2Rpdj5cbmAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdmYWRlJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZShcbiAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ2Jsb2NrJywgb3BhY2l0eTogMSwgaGVpZ2h0OiAnKicsIHdpZHRoOiAnKid9XG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZShcbiAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ25vbmUnLCBvcGFjaXR5OiAwLCBvdmVyZmxvdzogJ2hpZGRlbicsIGhlaWdodDogMCwgd2lkdGg6IDB9XG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzI1MG1zIGVhc2UtaW4nLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgaGVpZ2h0OiAnKicsIHdpZHRoOiAnKid9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMzUwbXMgZWFzZS1vdXQnLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgd2lkdGg6IDAsIGhlaWdodDogMH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSksXG4gICAgICAgIHRyaWdnZXIoJ29wYWNpdHknLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCc0NTBtcyBlYXNlLWluJywga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIG9mZnNldDogMH0pLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgb2Zmc2V0OiAxfSksXG4gICAgICAgICAgICAgICAgXSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzI1MG1zIGVhc2Utb3V0Jywga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIG9mZnNldDogMH0pLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMC41LCBvZmZzZXQ6IDAuM30pLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgb2Zmc2V0OiAxfSksXG4gICAgICAgICAgICAgICAgXSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmcyRHJvcGRvd25NZW51IHtcbiAgICAvKipcbiAgICAgKiBAbmFtZSB3aWR0aFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogbnVtYmVyID0gNDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBpZiBzZXQgdG8gdHJ1ZSwgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGRyb3Bkb3duIHdpbGwgYmUgYXV0b21hdGljYWxseSBmb2N1c2VkXG4gICAgICogQG5hbWUgZm9jdXNGaXJzdEVsZW1lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgZm9jdXNGaXJzdEVsZW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIHNldHMgZHJvcGRvd24gb2Zmc2V0IGZyb20gdGhlIGJ1dHRvblxuICAgICAqIEBuYW1lIG9mZnNldCB7c3RyaW5nfSBmb2xsb3cgZm9ybWF0ICc8bnVtYmVyPiA8bnVtYmVyPicgZXguICcwIDIwJ1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBvZmZzZXQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGFwcGVuZFRvQm9keVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgekluZGV4XG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIHpJbmRleCA9IDEwMDA7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBpdGVtc1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTmcyTWVudUl0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgcHVibGljIGl0ZW1zOiBRdWVyeUxpc3Q8TmcyTWVudUl0ZW0+O1xuXG4gICAgcHJpdmF0ZSBwb3NpdGlvbjogQ2xpZW50UmVjdDtcblxuICAgIHByaXZhdGUgbGlzdGVuZXJzOiB7IGFycm93SGFuZGxlcj86IEZ1bmN0aW9uLCBoYW5kbGVLZXlwcmVzcz86IEZ1bmN0aW9uIH0gPSB7XG4gICAgICAgIGFycm93SGFuZGxlcjogdW5kZWZpbmVkLFxuICAgICAgICBoYW5kbGVLZXlwcmVzczogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogRHJvcGRvd25TdGF0ZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgc2hvd1xuICAgICAqIEBzaG93cyBtZW51IGFuZCBzZWxlY3RzIGZpcnN0IGl0ZW1cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdyhwb3NpdGlvbj86IENsaWVudFJlY3QsIGR5bmFtaWMgPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCB3ZCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBzZXR0aW5nIGhhbmRsZXJzXG4gICAgICAgICAgICBpZiAoZGMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5oYW5kbGVLZXlwcmVzcyA9IHRoaXMucmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgLmxpc3RlbihkYy5ib2R5LCAna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5cHJlc3MuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmFycm93SGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdkLCAna2V5ZG93bicsIGFycm93S2V5c0hhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uLCBkeW5hbWljKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGhpZGVcbiAgICAgKiBAZGVzYyBoaWRlcyBtZW51XG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHJlc2V0IHNlbGVjdGVkIGl0ZW0gc3RhdGVcbiAgICAgICAgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnVuc2VsZWN0KCk7XG5cbiAgICAgICAgLy8gY2FsbCBmdW5jdGlvbiB0byB1bmxpc3RlblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnMuYXJyb3dIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5hcnJvd0hhbmRsZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5oYW5kbGVLZXlwcmVzcykge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHVwZGF0ZVBvc2l0aW9uXG4gICAgICogQGRlc2MgdXBkYXRlcyB0aGUgbWVudSBwb3NpdGlvbiBldmVyeSB0aW1lIGl0IGlzIHRvZ2dsZWRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24ge0NsaWVudFJlY3R9XG4gICAgICogQHBhcmFtIGR5bmFtaWMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uOiBDbGllbnRSZWN0LCBkeW5hbWljOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVPbkNoYW5nZShkeW5hbWljKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBoYW5kbGVLZXlwcmVzc1xuICAgICAqIEBkZXNjIGV4ZWN1dGVzIGZ1bmN0aW9ucyBvbiBrZXlQcmVzcyBiYXNlZCBvbiB0aGUga2V5IHByZXNzZWRcbiAgICAgKiBAcGFyYW0gJGV2ZW50XG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUtleXByZXNzKCRldmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBrZXkgPSAkZXZlbnQua2V5Q29kZTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBpdGVtcy5pbmRleE9mKHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3RlZEl0ZW0hKTtcblxuICAgICAgICBpZiAoIUFDVElPTlMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgQUNUSU9OU1trZXldLmNhbGwodGhpcywgaW5kZXgsIGl0ZW1zLCB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGdldE1lbnVFbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRNZW51RWxlbWVudCgpOiBFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGNhbGNQb3NpdGlvbk9mZnNldFxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY1Bvc2l0aW9uT2Zmc2V0KHBvc2l0aW9uKTogeyB0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nIH0gfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCB3ZCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBkYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIXdkIHx8ICFkYyB8fCAhcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldE1lbnVFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRQYWdlT2Zmc2V0ID0gd2QucGFnZVhPZmZzZXQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgaXNDU1MxQ29tcGF0ID0gKChkYy5jb21wYXRNb2RlIHx8ICcnKSA9PT0gJ0NTUzFDb21wYXQnKTtcblxuICAgICAgICBjb25zdCB4ID0gc3VwcG9ydFBhZ2VPZmZzZXQgPyB3ZC5wYWdlWE9mZnNldCA6IGlzQ1NTMUNvbXBhdCA/XG4gICAgICAgICAgICBkYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCA6IGRjLmJvZHkuc2Nyb2xsTGVmdDtcblxuICAgICAgICBjb25zdCB5ID0gc3VwcG9ydFBhZ2VPZmZzZXQgPyB3ZC5wYWdlWU9mZnNldCA6IGlzQ1NTMUNvbXBhdCA/XG4gICAgICAgICAgICBkYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogZGMuYm9keS5zY3JvbGxUb3A7XG5cbiAgICAgICAgbGV0IHsgdG9wLCBsZWZ0IH0gPSB0aGlzLmFwcGx5T2Zmc2V0KFxuICAgICAgICAgICAgYCR7cG9zaXRpb24udG9wICsgKHRoaXMuYXBwZW5kVG9Cb2R5ID8geSAtIDE1IDogMCl9cHhgLFxuICAgICAgICAgICAgYCR7cG9zaXRpb24ubGVmdCArIHggLSA1fXB4YFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGNsaWVudFdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgY2xpZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgY29uc3QgbWFyZ2luRnJvbUJvdHRvbSA9IHBhcnNlSW50KHRvcCkgKyBjbGllbnRIZWlnaHQgKyAodGhpcy5hcHBlbmRUb0JvZHkgPyAwIDogeSAtIDE1KTtcbiAgICAgICAgY29uc3QgbWFyZ2luRnJvbVJpZ2h0ID0gcGFyc2VJbnQobGVmdCkgKyBjbGllbnRXaWR0aDtcblxuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxIZWlnaHQgPSB3ZC5pbm5lckhlaWdodCArIHdkLnNjcm9sbFk7XG4gICAgICAgIGNvbnN0IHdpbmRvd1Njcm9sbFdpZHRoID0gd2QuaW5uZXJXaWR0aCArIHdkLnNjcm9sbFg7XG5cbiAgICAgICAgaWYgKG1hcmdpbkZyb21Cb3R0b20gPj0gd2luZG93U2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSBgJHtwYXJzZUludCh0b3AucmVwbGFjZSgncHgnLCAnJykpIC0gY2xpZW50SGVpZ2h0fXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXJnaW5Gcm9tUmlnaHQgPj0gd2luZG93U2Nyb2xsV2lkdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gbWFyZ2luRnJvbVJpZ2h0IC0gd2luZG93U2Nyb2xsV2lkdGggKyAzMDtcbiAgICAgICAgICAgIGxlZnQgPSBgJHtwYXJzZUludChsZWZ0LnJlcGxhY2UoJ3B4JywgJycpKSAtIG1hcmdpblJpZ2h0fXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHRvcCwgbGVmdCB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlPZmZzZXQodG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZyk6IHsgdG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZyB9IHtcbiAgICAgICAgaWYgKCF0aGlzLm9mZnNldCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdG9wLCBsZWZ0IH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldC5zcGxpdCgnICcpO1xuXG4gICAgICAgIGlmICghb2Zmc2V0WzFdKSB7XG4gICAgICAgICAgICBvZmZzZXRbMV0gPSAnMCc7XG4gICAgICAgIH1cblxuICAgICAgICB0b3AgPSBgJHtwYXJzZUludCh0b3AucmVwbGFjZSgncHgnLCAnJykpICsgcGFyc2VJbnQob2Zmc2V0WzBdKX1weGA7XG4gICAgICAgIGxlZnQgPSBgJHtwYXJzZUludChsZWZ0LnJlcGxhY2UoJ3B4JywgJycpKSArIHBhcnNlSW50KG9mZnNldFsxXSl9cHhgO1xuXG4gICAgICAgIHJldHVybiB7IHRvcCwgbGVmdCB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgZGMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSAmJiBkYykge1xuICAgICAgICAgICAgLy8gYXBwZW5kIG1lbnUgZWxlbWVudCB0byB0aGUgYm9keVxuICAgICAgICAgICAgZGMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlT25DaGFuZ2UoZHluYW1pYyA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0TWVudUVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhbGNQb3NpdGlvbk9mZnNldCh0aGlzLnBvc2l0aW9uKTtcblxuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGVsZW1lbnQsICd0b3AnLCBwb3NpdGlvbi50b3AudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShlbGVtZW50LCAnbGVmdCcsIHBvc2l0aW9uLmxlZnQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZWxlY3QgZmlyc3QgaXRlbSB1bmxlc3MgdXNlciBkaXNhYmxlZCB0aGlzIG9wdGlvblxuICAgICAgICBpZiAodGhpcy5mb2N1c0ZpcnN0RWxlbWVudCAmJlxuICAgICAgICAgICAgdGhpcy5pdGVtcy5maXJzdCAmJlxuICAgICAgICAgICAgIXRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3QodGhpcy5pdGVtcy5maXJzdCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=