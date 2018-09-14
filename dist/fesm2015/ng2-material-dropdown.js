import { Component, Output, Input, EventEmitter, ElementRef, Injectable, Renderer, ContentChildren, HostListener, ContentChild, NgModule } from '@angular/core';
import { trigger, style, transition, animate, keyframes, state } from '@angular/animations';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2DropdownButton {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.onMenuToggled = new EventEmitter();
        this.showCaret = true;
    }
    /**
     * \@name toggleMenu
     * @desc emits event to toggle menu
     * @return {?}
     */
    toggleMenu() {
        this.onMenuToggled.emit(true);
    }
    /**
     * \@name getPosition
     * @desc returns position of the button
     * @return {?}
     */
    getPosition() {
        return this.element.nativeElement.getBoundingClientRect();
    }
}
Ng2DropdownButton.decorators = [
    { type: Component, args: [{
                selector: 'ng2-dropdown-button',
                styles: [`.ng2-dropdown-button{font-family:Roboto,"Helvetica Neue",Helvetica,Arial;background:#fff;padding:.45rem .25rem;font-size:14px;letter-spacing:.08rem;color:#444;outline:0;cursor:pointer;font-weight:400;border:none;border-bottom:1px solid #efefef;text-align:left;min-width:100px;width:100%;display:flex;flex-direction:row;max-width:150px}.ng2-dropdown-button:hover{color:#222}.ng2-dropdown-button:active,.ng2-dropdown-button:focus{color:#222;border-bottom:2px solid #2196f3}.ng2-dropdown-button__label{flex:1 1 95%}.ng2-dropdown-button__caret{width:12px;height:12px;display:flex;flex:1 1 6%}:host-context(.ng2-dropdown-button--icon) .ng2-dropdown-button{border:none;min-width:40px;width:40px;border-radius:100%;transition:all .2s;text-align:center;height:40px;padding:.5em}:host-context(.ng2-dropdown-button--icon) .ng2-dropdown-button:active{background:rgba(0,0,0,.2)}`],
                template: `<button class='ng2-dropdown-button' type="button" (click)="toggleMenu()" tabindex="0s">
    <span class="ng2-dropdown-button__label">
        <ng-content></ng-content>
    </span>

    <span class="ng2-dropdown-button__caret" *ngIf="showCaret">
        <svg enable-background="new 0 0 32 32" height="16px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002  c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" fill="#121313" id="Expand_More"/><g/><g/><g/><g/><g/><g/></svg>
    </span>
</button>
`
            },] },
];
/** @nocollapse */
Ng2DropdownButton.ctorParameters = () => [
    { type: ElementRef, },
];
Ng2DropdownButton.propDecorators = {
    "onMenuToggled": [{ type: Output },],
    "showCaret": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ KEYS = {
    BACKSPACE: 9,
    PREV: 38,
    NEXT: 40,
    ENTER: 13,
    ESCAPE: 27
};
/**
 * \@name onSwitchNext
 * @param index
 * @param items
 * @param state
 */
const /** @type {?} */ onSwitchNext = (index, items, state$$1) => {
    if (index < items.length - 1) {
        state$$1.select(items[index + 1], true);
    }
};
/**
 * \@name onSwitchPrev
 * @param index
 * @param items
 * @param state
 */
const /** @type {?} */ onSwitchPrev = (index, items, state$$1) => {
    if (index > 0) {
        state$$1.select(items[index - 1], true);
    }
};
/**
 * \@name onBackspace
 * @param index
 * @param items
 * @param state
 */
const /** @type {?} */ onBackspace = (index, items, state$$1) => {
    if (index < items.length - 1) {
        state$$1.select(items[index + 1], true);
    }
    else {
        state$$1.select(items[0], true);
    }
};
/**
 * @this {?}
 * @return {?}
 */
function onEscape() {
    this.hide();
}
/**
 * \@name onItemClicked
 * @param index
 * @param items
 * @param state
 */
const /** @type {?} */ onItemClicked = (index, items, state$$1) => {
    return state$$1.selectedItem ? state$$1.selectedItem.click() : undefined;
};
const /** @type {?} */ ACTIONS = {
    [KEYS.BACKSPACE]: onBackspace,
    [KEYS.PREV]: onSwitchPrev,
    [KEYS.NEXT]: onSwitchNext,
    [KEYS.ENTER]: onItemClicked,
    [KEYS.ESCAPE]: onEscape
};
/**
 * @param {?} event
 * @return {?}
 */
function arrowKeysHandler(event) {
    if ([38, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2DropdownState {
    constructor() {
        this.onItemSelected = new EventEmitter();
        this.onItemClicked = new EventEmitter();
        this.onItemDestroyed = new EventEmitter();
    }
    /**
     * \@name selectedItem
     * @desc getter for _selectedItem
     * @return {?}
     */
    get selectedItem() {
        return this._selectedItem;
    }
    /**
     * \@name selects a menu item and emits event
     * @param {?} item
     * @param {?=} dispatchEvent
     * @return {?}
     */
    select(item, dispatchEvent = true) {
        this._selectedItem = item;
        if (!dispatchEvent || !item) {
            return;
        }
        item.focus();
        this.onItemSelected.emit(item);
    }
    /**
     * \@name unselect
     * @desc sets _selectedItem as undefined
     * @return {?}
     */
    unselect() {
        this._selectedItem = undefined;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownStateService {
    constructor() {
        this.menuState = {
            isVisible: /** @type {?} */ (false),
            /**
             * @return {?}
             */
            toString() {
                return this.isVisible === true ? 'visible' : 'hidden';
            }
        };
        this.dropdownState = new Ng2DropdownState();
    }
}
DropdownStateService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2MenuItem {
    /**
     * @param {?} state
     * @param {?} element
     * @param {?} renderer
     */
    constructor(state$$1, element, renderer) {
        this.state = state$$1;
        this.element = element;
        this.renderer = renderer;
        /**
         * \@preventClose
         * @desc if true, clicking on the item won't close the dropdown
         */
        this.preventClose = false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.state.dropdownState.onItemDestroyed.emit(this);
    }
    /**
     * \@name isSelected
     * @desc returns current selected item
     * @return {?}
     */
    get isSelected() {
        return this === this.state.dropdownState.selectedItem;
    }
    /**
     * \@name click
     * @desc emits select event
     * @param {?=} $event
     * @return {?}
     */
    select($event) {
        this.state.dropdownState.select(this, true);
        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }
    }
    /**
     * \@name click
     * @desc emits click event
     * @return {?}
     */
    click() {
        this.state.dropdownState.onItemClicked.emit(this);
    }
    /**
     * \@name focus
     * @return {?}
     */
    focus() {
        this.renderer.invokeElementMethod(this.element.nativeElement.children[0], 'focus');
    }
}
Ng2MenuItem.decorators = [
    { type: Component, args: [{
                selector: 'ng2-menu-item',
                styles: [`.ng2-menu-item{font-family:Roboto,"Helvetica Neue",Helvetica,Arial;background:#fff;color:rgba(0,0,0,.87);cursor:pointer;font-size:.9em;text-transform:none;font-weight:400;letter-spacing:.03em;height:48px;line-height:48px;padding:.3em 1.25rem;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;transition:background .25s}.ng2-menu-item--selected{background:rgba(158,158,158,.2);outline:0}.ng2-menu-item:focus{outline:0}.ng2-menu-item:active{background:rgba(158,158,158,.4)}:host(ng2-menu-item) /deep/ [ng2-menu-item-icon]{vertical-align:middle;font-size:28px;width:1.5em;height:30px;color:rgba(0,0,0,.44)}`],
                template: `<div class='ng2-menu-item'
     role="button"
     tabindex="0"
     [class.ng2-menu-item--selected]="isSelected"
     (keydown.enter)="click()"
     (click)="click()"
     (mouseover)="select()">
        <ng-content></ng-content>
</div>
`
            },] },
];
/** @nocollapse */
Ng2MenuItem.ctorParameters = () => [
    { type: DropdownStateService, },
    { type: ElementRef, },
    { type: Renderer, },
];
Ng2MenuItem.propDecorators = {
    "preventClose": [{ type: Input },],
    "value": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2DropdownMenu {
    /**
     * @param {?} state
     * @param {?} element
     * @param {?} renderer
     */
    constructor(state$$1, element, renderer) {
        this.state = state$$1;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2Dropdown {
    /**
     * @param {?} state
     */
    constructor(state$$1) {
        this.state = state$$1;
        this.dynamicUpdate = true;
        // outputs
        this.onItemClicked = new EventEmitter();
        this.onItemSelected = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state.dropdownState.onItemClicked.subscribe(item => {
            this.onItemClicked.emit(item);
            if (item.preventClose) {
                return;
            }
            this.hide.call(this);
        });
        if (this.button) {
            this.button.onMenuToggled.subscribe(() => {
                this.toggleMenu();
            });
        }
        this.state.dropdownState.onItemSelected.subscribe(item => {
            this.onItemSelected.emit(item);
        });
        this.state.dropdownState.onItemDestroyed.subscribe((item) => {
            let /** @type {?} */ newSelectedItem;
            const /** @type {?} */ items = this.menu.items.toArray();
            if (item !== this.state.dropdownState.selectedItem) {
                return;
            }
            if (this.menu.focusFirstElement) {
                newSelectedItem = item === items[0] && items.length > 1 ? items[1] : items[0];
            }
            this.state.dropdownState.select(newSelectedItem);
        });
    }
    /**
     * \@name toggleMenu
     * @desc toggles menu visibility
     * @param {?=} position
     * @return {?}
     */
    toggleMenu(position = this.button.getPosition()) {
        this.state.menuState.isVisible ? this.hide() : this.show(position);
    }
    /**
     * - hides dropdown
     * \@name hide
     * @return {?}
     */
    hide() {
        this.menu.hide();
        this.onHide.emit(this);
    }
    /**
     * - shows dropdown
     * \@name show
     * @param {?=} position
     * @return {?}
     */
    show(position = this.button.getPosition()) {
        this.menu.show(position, this.dynamicUpdate);
        this.onShow.emit(this);
    }
    /**
     * \@name scrollListener
     * @return {?}
     */
    scrollListener() {
        if (this.button && this.dynamicUpdate) {
            this.menu.updatePosition(this.button.getPosition(), true);
        }
    }
}
Ng2Dropdown.decorators = [
    { type: Component, args: [{
                selector: 'ng2-dropdown',
                template: `<div class="ng2-dropdown-container">
    <ng-content select="ng2-dropdown-button"></ng-content>
    <ng-content select="ng2-dropdown-menu"></ng-content>
</div>
`,
                providers: [DropdownStateService]
            },] },
];
/** @nocollapse */
Ng2Dropdown.ctorParameters = () => [
    { type: DropdownStateService, },
];
Ng2Dropdown.propDecorators = {
    "button": [{ type: ContentChild, args: [Ng2DropdownButton,] },],
    "menu": [{ type: ContentChild, args: [Ng2DropdownMenu,] },],
    "dynamicUpdate": [{ type: Input },],
    "onItemClicked": [{ type: Output },],
    "onItemSelected": [{ type: Output },],
    "onShow": [{ type: Output },],
    "onHide": [{ type: Output },],
    "scrollListener": [{ type: HostListener, args: ['window:scroll',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Ng2DropdownModule {
}
Ng2DropdownModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    Ng2MenuItem,
                    Ng2DropdownButton,
                    Ng2DropdownMenu,
                    Ng2Dropdown
                ],
                declarations: [
                    Ng2Dropdown,
                    Ng2MenuItem,
                    Ng2DropdownButton,
                    Ng2DropdownMenu,
                ],
                imports: [
                    CommonModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { Ng2Dropdown, Ng2DropdownMenu, Ng2MenuItem, Ng2DropdownButton, Ng2DropdownModule, DropdownStateService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW1hdGVyaWFsLWRyb3Bkb3duLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vc3JjL21vZHVsZXMvY29tcG9uZW50cy9idXR0b24vbmcyLWRyb3Bkb3duLWJ1dHRvbi50cyIsIm5nOi8vbmcyLW1hdGVyaWFsLWRyb3Bkb3duL3NyYy9tb2R1bGVzL2NvbXBvbmVudHMvbWVudS9hY3Rpb25zLnRzIiwibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vc3JjL21vZHVsZXMvc2VydmljZXMvbmcyLWRyb3Bkb3duLXN0YXRlLnRzIiwibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vc3JjL21vZHVsZXMvc2VydmljZXMvZHJvcGRvd24tc3RhdGUuc2VydmljZS50cyIsIm5nOi8vbmcyLW1hdGVyaWFsLWRyb3Bkb3duL3NyYy9tb2R1bGVzL2NvbXBvbmVudHMvbWVudS1pdGVtL25nMi1tZW51LWl0ZW0udHMiLCJuZzovL25nMi1tYXRlcmlhbC1kcm9wZG93bi9zcmMvbW9kdWxlcy9jb21wb25lbnRzL21lbnUvbmcyLWRyb3Bkb3duLW1lbnUudHMiLCJuZzovL25nMi1tYXRlcmlhbC1kcm9wZG93bi9zcmMvbW9kdWxlcy9jb21wb25lbnRzL2Ryb3Bkb3duL25nMi1kcm9wZG93bi50cyIsIm5nOi8vbmcyLW1hdGVyaWFsLWRyb3Bkb3duL3NyYy9tb2R1bGVzL25nMi1kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgT3V0cHV0LFxuICAgIElucHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nMi1kcm9wZG93bi1idXR0b24nLFxuICAgIHN0eWxlczogW2AubmcyLWRyb3Bkb3duLWJ1dHRvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLEhlbHZldGljYSxBcmlhbDtiYWNrZ3JvdW5kOiNmZmY7cGFkZGluZzouNDVyZW0gLjI1cmVtO2ZvbnQtc2l6ZToxNHB4O2xldHRlci1zcGFjaW5nOi4wOHJlbTtjb2xvcjojNDQ0O291dGxpbmU6MDtjdXJzb3I6cG9pbnRlcjtmb250LXdlaWdodDo0MDA7Ym9yZGVyOm5vbmU7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2VmZWZlZjt0ZXh0LWFsaWduOmxlZnQ7bWluLXdpZHRoOjEwMHB4O3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzttYXgtd2lkdGg6MTUwcHh9Lm5nMi1kcm9wZG93bi1idXR0b246aG92ZXJ7Y29sb3I6IzIyMn0ubmcyLWRyb3Bkb3duLWJ1dHRvbjphY3RpdmUsLm5nMi1kcm9wZG93bi1idXR0b246Zm9jdXN7Y29sb3I6IzIyMjtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjMjE5NmYzfS5uZzItZHJvcGRvd24tYnV0dG9uX19sYWJlbHtmbGV4OjEgMSA5NSV9Lm5nMi1kcm9wZG93bi1idXR0b25fX2NhcmV0e3dpZHRoOjEycHg7aGVpZ2h0OjEycHg7ZGlzcGxheTpmbGV4O2ZsZXg6MSAxIDYlfTpob3N0LWNvbnRleHQoLm5nMi1kcm9wZG93bi1idXR0b24tLWljb24pIC5uZzItZHJvcGRvd24tYnV0dG9ue2JvcmRlcjpub25lO21pbi13aWR0aDo0MHB4O3dpZHRoOjQwcHg7Ym9yZGVyLXJhZGl1czoxMDAlO3RyYW5zaXRpb246YWxsIC4yczt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6NDBweDtwYWRkaW5nOi41ZW19Omhvc3QtY29udGV4dCgubmcyLWRyb3Bkb3duLWJ1dHRvbi0taWNvbikgLm5nMi1kcm9wZG93bi1idXR0b246YWN0aXZle2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMil9YF0sXG4gICAgdGVtcGxhdGU6IGA8YnV0dG9uIGNsYXNzPSduZzItZHJvcGRvd24tYnV0dG9uJyB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZU1lbnUoKVwiIHRhYmluZGV4PVwiMHNcIj5cbiAgICA8c3BhbiBjbGFzcz1cIm5nMi1kcm9wZG93bi1idXR0b25fX2xhYmVsXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cIm5nMi1kcm9wZG93bi1idXR0b25fX2NhcmV0XCIgKm5nSWY9XCJzaG93Q2FyZXRcIj5cbiAgICAgICAgPHN2ZyBlbmFibGUtYmFja2dyb3VuZD1cIm5ldyAwIDAgMzIgMzJcIiBoZWlnaHQ9XCIxNnB4XCIgaWQ9XCLDkMKhw5DCu8OQwr7DkMK5XzFcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCAzMiAzMlwiIHdpZHRoPVwiMTZweFwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPjxwYXRoIGQ9XCJNMjQuMjg1LDExLjI4NEwxNiwxOS41NzFsLTguMjg1LTguMjg4Yy0wLjM5NS0wLjM5NS0xLjAzNC0wLjM5NS0xLjQyOSwwICBjLTAuMzk0LDAuMzk1LTAuMzk0LDEuMDM1LDAsMS40M2w4Ljk5OSw5LjAwMmwwLDBsMCwwYzAuMzk0LDAuMzk1LDEuMDM0LDAuMzk1LDEuNDI4LDBsOC45OTktOS4wMDIgIGMwLjM5NC0wLjM5NSwwLjM5NC0xLjAzNiwwLTEuNDMxQzI1LjMxOSwxMC44ODksMjQuNjc5LDEwLjg4OSwyNC4yODUsMTEuMjg0elwiIGZpbGw9XCIjMTIxMzEzXCIgaWQ9XCJFeHBhbmRfTW9yZVwiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz5cbiAgICA8L3NwYW4+XG48L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTmcyRHJvcGRvd25CdXR0b24ge1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25NZW51VG9nZ2xlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93Q2FyZXQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgdG9nZ2xlTWVudVxuICAgICAqIEBkZXNjIGVtaXRzIGV2ZW50IHRvIHRvZ2dsZSBtZW51XG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZU1lbnUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25NZW51VG9nZ2xlZC5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGdldFBvc2l0aW9uXG4gICAgICogQGRlc2MgcmV0dXJucyBwb3NpdGlvbiBvZiB0aGUgYnV0dG9uXG4gICAgICovXG4gICAgcHVibGljIGdldFBvc2l0aW9uKCk6IENsaWVudFJlY3Qge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nMk1lbnVJdGVtIH0gZnJvbSAnLi4vbWVudS1pdGVtL25nMi1tZW51LWl0ZW0nO1xuaW1wb3J0IHsgTmcyRHJvcGRvd25NZW51IH0gZnJvbSAnLi9uZzItZHJvcGRvd24tbWVudSc7XG5pbXBvcnQgeyBOZzJEcm9wZG93blN0YXRlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbmcyLWRyb3Bkb3duLXN0YXRlJztcblxuY29uc3QgS0VZUyA9IHtcbiAgICBCQUNLU1BBQ0U6IDksXG4gICAgUFJFVjogMzgsXG4gICAgTkVYVDogNDAsXG4gICAgRU5URVI6IDEzLFxuICAgIEVTQ0FQRTogMjdcbn07XG5cbi8qKlxuICogQG5hbWUgb25Td2l0Y2hOZXh0XG4gKiBAcGFyYW0gaW5kZXhcbiAqIEBwYXJhbSBpdGVtc1xuICogQHBhcmFtIHN0YXRlXG4gKi9cbmNvbnN0IG9uU3dpdGNoTmV4dCA9IChpbmRleDogbnVtYmVyLCBpdGVtczogTmcyTWVudUl0ZW1bXSwgc3RhdGU6IE5nMkRyb3Bkb3duU3RhdGUpID0+IHtcbiAgICBpZiAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdChpdGVtc1tpbmRleCArIDFdLCB0cnVlKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEBuYW1lIG9uU3dpdGNoUHJldlxuICogQHBhcmFtIGluZGV4XG4gKiBAcGFyYW0gaXRlbXNcbiAqIEBwYXJhbSBzdGF0ZVxuICovXG5jb25zdCBvblN3aXRjaFByZXYgPSAoaW5kZXg6IG51bWJlciwgaXRlbXM6IE5nMk1lbnVJdGVtW10sIHN0YXRlOiBOZzJEcm9wZG93blN0YXRlKSA9PiB7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICBzdGF0ZS5zZWxlY3QoaXRlbXNbaW5kZXggLSAxXSwgdHJ1ZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBAbmFtZSBvbkJhY2tzcGFjZVxuICogQHBhcmFtIGluZGV4XG4gKiBAcGFyYW0gaXRlbXNcbiAqIEBwYXJhbSBzdGF0ZVxuICovXG5jb25zdCBvbkJhY2tzcGFjZSA9IChpbmRleDogbnVtYmVyLCBpdGVtczogTmcyTWVudUl0ZW1bXSwgc3RhdGU6IE5nMkRyb3Bkb3duU3RhdGUpID0+IHtcbiAgICBpZiAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdChpdGVtc1tpbmRleCArIDFdLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5zZWxlY3QoaXRlbXNbMF0sIHRydWUpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIG9uRXNjYXBlKHRoaXM6IE5nMkRyb3Bkb3duTWVudSkge1xuICAgIHRoaXMuaGlkZSgpO1xufTtcblxuLyoqXG4gKiBAbmFtZSBvbkl0ZW1DbGlja2VkXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEBwYXJhbSBpdGVtc1xuICogQHBhcmFtIHN0YXRlXG4gKi9cbmNvbnN0IG9uSXRlbUNsaWNrZWQgPSAoaW5kZXg6IG51bWJlciwgaXRlbXM6IE5nMk1lbnVJdGVtW10sIHN0YXRlOiBOZzJEcm9wZG93blN0YXRlKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLnNlbGVjdGVkSXRlbSA/IHN0YXRlLnNlbGVjdGVkSXRlbS5jbGljaygpIDogdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IEFDVElPTlMgPSB7XG4gICAgW0tFWVMuQkFDS1NQQUNFXTogb25CYWNrc3BhY2UsXG4gICAgW0tFWVMuUFJFVl06IG9uU3dpdGNoUHJldixcbiAgICBbS0VZUy5ORVhUXTogb25Td2l0Y2hOZXh0LFxuICAgIFtLRVlTLkVOVEVSXTogb25JdGVtQ2xpY2tlZCxcbiAgICBbS0VZUy5FU0NBUEVdOiBvbkVzY2FwZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFycm93S2V5c0hhbmRsZXIoZXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoWzM4LCA0MF0uaW5kZXhPZihldmVudC5rZXlDb2RlKSA+IC0xKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZzJNZW51SXRlbSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudS1pdGVtL25nMi1tZW51LWl0ZW0nO1xuXG5leHBvcnQgY2xhc3MgTmcyRHJvcGRvd25TdGF0ZSB7XG4gICAgcHVibGljIG9uSXRlbVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TmcyTWVudUl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZzJNZW51SXRlbT4oKTtcbiAgICBwdWJsaWMgb25JdGVtQ2xpY2tlZDogRXZlbnRFbWl0dGVyPE5nMk1lbnVJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmcyTWVudUl0ZW0+KCk7XG4gICAgcHVibGljIG9uSXRlbURlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE5nMk1lbnVJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmcyTWVudUl0ZW0+KCk7XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZEl0ZW0/OiBOZzJNZW51SXRlbTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHNlbGVjdGVkSXRlbVxuICAgICAqIEBkZXNjIGdldHRlciBmb3IgX3NlbGVjdGVkSXRlbVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRJdGVtKCk6IE5nMk1lbnVJdGVtIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBzZWxlY3RzIGEgbWVudSBpdGVtIGFuZCBlbWl0cyBldmVudFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdChpdGVtOiBOZzJNZW51SXRlbSB8IHVuZGVmaW5lZCwgZGlzcGF0Y2hFdmVudCA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcblxuICAgICAgICBpZiAoIWRpc3BhdGNoRXZlbnQgfHwgIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uZm9jdXMoKTtcblxuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgdW5zZWxlY3RcbiAgICAgKiBAZGVzYyBzZXRzIF9zZWxlY3RlZEl0ZW0gYXMgdW5kZWZpbmVkXG4gICAgICovXG4gICAgcHVibGljIHVuc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmcyRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vbmcyLWRyb3Bkb3duLXN0YXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duU3RhdGVTZXJ2aWNlIHtcbiAgICBwdWJsaWMgbWVudVN0YXRlID0ge1xuICAgICAgICBpc1Zpc2libGU6IDxib29sZWFuPmZhbHNlLFxuICAgICAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlID09PSB0cnVlID8gJ3Zpc2libGUnIDogJ2hpZGRlbic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHVibGljIGRyb3Bkb3duU3RhdGU6IE5nMkRyb3Bkb3duU3RhdGUgPSBuZXcgTmcyRHJvcGRvd25TdGF0ZSgpO1xufVxuIiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgUmVuZGVyZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyb3Bkb3duU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZHJvcGRvd24tc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmcyLW1lbnUtaXRlbScsXG4gICAgc3R5bGVzOiBbYC5uZzItbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsSGVsdmV0aWNhLEFyaWFsO2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyk7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOi45ZW07dGV4dC10cmFuc2Zvcm06bm9uZTtmb250LXdlaWdodDo0MDA7bGV0dGVyLXNwYWNpbmc6LjAzZW07aGVpZ2h0OjQ4cHg7bGluZS1oZWlnaHQ6NDhweDtwYWRkaW5nOi4zZW0gMS4yNXJlbTt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dHJhbnNpdGlvbjpiYWNrZ3JvdW5kIC4yNXN9Lm5nMi1tZW51LWl0ZW0tLXNlbGVjdGVke2JhY2tncm91bmQ6cmdiYSgxNTgsMTU4LDE1OCwuMik7b3V0bGluZTowfS5uZzItbWVudS1pdGVtOmZvY3Vze291dGxpbmU6MH0ubmcyLW1lbnUtaXRlbTphY3RpdmV7YmFja2dyb3VuZDpyZ2JhKDE1OCwxNTgsMTU4LC40KX06aG9zdChuZzItbWVudS1pdGVtKSAvZGVlcC8gW25nMi1tZW51LWl0ZW0taWNvbl17dmVydGljYWwtYWxpZ246bWlkZGxlO2ZvbnQtc2l6ZToyOHB4O3dpZHRoOjEuNWVtO2hlaWdodDozMHB4O2NvbG9yOnJnYmEoMCwwLDAsLjQ0KX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J25nMi1tZW51LWl0ZW0nXG4gICAgIHJvbGU9XCJidXR0b25cIlxuICAgICB0YWJpbmRleD1cIjBcIlxuICAgICBbY2xhc3MubmcyLW1lbnUtaXRlbS0tc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZFwiXG4gICAgIChrZXlkb3duLmVudGVyKT1cImNsaWNrKClcIlxuICAgICAoY2xpY2spPVwiY2xpY2soKVwiXG4gICAgIChtb3VzZW92ZXIpPVwic2VsZWN0KClcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIE5nMk1lbnVJdGVtIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBAcHJldmVudENsb3NlXG4gICAgICogQGRlc2MgaWYgdHJ1ZSwgY2xpY2tpbmcgb24gdGhlIGl0ZW0gd29uJ3QgY2xvc2UgdGhlIGRyb3Bkb3duXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIHByZXZlbnRDbG9zZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgdmFsdWVcbiAgICAgKiBAZGVzYyBhbnkgdmFsdWUgYXNzb2NpYXRlZCB0byB0aGUgaXRlbVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB2YWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZTogRHJvcGRvd25TdGF0ZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUub25JdGVtRGVzdHJveWVkLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgaXNTZWxlY3RlZFxuICAgICAqIEBkZXNjIHJldHVybnMgY3VycmVudCBzZWxlY3RlZCBpdGVtXG4gICAgICovXG4gICAgcHVibGljIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdGVkSXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBjbGlja1xuICAgICAqIEBkZXNjIGVtaXRzIHNlbGVjdCBldmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3QoJGV2ZW50Pyk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0KHRoaXMsIHRydWUpO1xuXG4gICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgY2xpY2tcbiAgICAgKiBAZGVzYyBlbWl0cyBjbGljayBldmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBjbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLm9uSXRlbUNsaWNrZWQuZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBmb2N1c1xuICAgICAqL1xuICAgIHB1YmxpYyBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAnZm9jdXMnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIFJlbmRlcmVyLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgdHJpZ2dlcixcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIGFuaW1hdGUsXG4gICAga2V5ZnJhbWVzLFxuICAgIHN0YXRlXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBBQ1RJT05TLCBhcnJvd0tleXNIYW5kbGVyIH0gZnJvbSAnLi9hY3Rpb25zJztcblxuaW1wb3J0IHsgTmcyTWVudUl0ZW0gfSBmcm9tICcuLi9tZW51LWl0ZW0vbmcyLW1lbnUtaXRlbSc7XG5pbXBvcnQgeyBEcm9wZG93blN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Ryb3Bkb3duLXN0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nMi1kcm9wZG93bi1tZW51JyxcbiAgICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9ja30ubmcyLWRyb3Bkb3duLW1lbnV7b3ZlcmZsb3cteTphdXRvO2JveC1zaGFkb3c6MCAxcHggMnB4IDAgcmdiYSgwLDAsMCwuMyk7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZzouNWVtIDA7YmFja2dyb3VuZDojZmZmO2JvcmRlci1yYWRpdXM6MXB4O21heC1oZWlnaHQ6NDAwcHg7d2lkdGg6MjYwcHg7bWluLWhlaWdodDowO2Rpc3BsYXk6YmxvY2t9Lm5nMi1kcm9wZG93bi1tZW51Lm5nMi1kcm9wZG93bi1tZW51LS1pbnNpZGUtZWxlbWVudHtwb3NpdGlvbjpmaXhlZH0ubmcyLWRyb3Bkb3duLW1lbnUubmcyLWRyb3Bkb3duLW1lbnUtLXdpZHRoLS0ye3dpZHRoOjIwMHB4fS5uZzItZHJvcGRvd24tbWVudS5uZzItZHJvcGRvd24tbWVudS0td2lkdGgtLTR7d2lkdGg6MjYwcHh9Lm5nMi1kcm9wZG93bi1tZW51Lm5nMi1kcm9wZG93bi1tZW51LS13aWR0aC0tNnt3aWR0aDozMjBweH0ubmcyLWRyb3Bkb3duLWJhY2tkcm9we3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MTtvdmVyZmxvdzpoaWRkZW59Omhvc3QgL2RlZXAvIC5uZzItbWVudS1kaXZpZGVye2hlaWdodDoxcHg7bWluLWhlaWdodDoxcHg7bWF4LWhlaWdodDoxcHg7d2lkdGg6MTAwJTtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQ6I2Y5ZjlmOX1gXSxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gTUVOVSAtLT5cbjxkaXYgY2xhc3M9J25nMi1kcm9wZG93bi1tZW51IG5nMi1kcm9wZG93bi1tZW51LS0td2lkdGgtLXt7IHdpZHRoIH19J1xuICAgICBbY2xhc3MubmcyLWRyb3Bkb3duLW1lbnUtLWluc2lkZS1lbGVtZW50XT1cIiFhcHBlbmRUb0JvZHlcIlxuICAgICBbY2xhc3MubmcyLWRyb3Bkb3duLW1lbnUtLW9wZW5dPVwic3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZVwiXG4gICAgIFtzdHlsZS56LWluZGV4XT1cInpJbmRleFwiXG4gICAgIFtAZmFkZV09XCJzdGF0ZS5tZW51U3RhdGUudG9TdHJpbmcoKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmcyLWRyb3Bkb3duLW1lbnVfX29wdGlvbnMtY29udGFpbmVyXCJcbiAgICAgICAgICAgICBbQG9wYWNpdHldPVwic3RhdGUubWVudVN0YXRlLnRvU3RyaW5nKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBCQUNLRFJPUCAtLT5cbjxkaXYgY2xhc3M9XCJuZzItZHJvcGRvd24tYmFja2Ryb3BcIiAqbmdJZj1cInN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGVcIiAoY2xpY2spPVwiaGlkZSgpXCI+PC9kaXY+XG5gLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoXG4gICAgICAgICAgICAgICAge2Rpc3BsYXk6ICdibG9jaycsIG9wYWNpdHk6IDEsIGhlaWdodDogJyonLCB3aWR0aDogJyonfVxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoXG4gICAgICAgICAgICAgICAge2Rpc3BsYXk6ICdub25lJywgb3BhY2l0eTogMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCBoZWlnaHQ6IDAsIHdpZHRoOiAwfVxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcyNTBtcyBlYXNlLWluJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIGhlaWdodDogJyonLCB3aWR0aDogJyonfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzM1MG1zIGVhc2Utb3V0JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pLFxuICAgICAgICB0cmlnZ2VyKCdvcGFjaXR5JywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnNDUwbXMgZWFzZS1pbicsIGtleWZyYW1lcyhbXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCBvZmZzZXQ6IDB9KSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIG9mZnNldDogMX0pLFxuICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcyNTBtcyBlYXNlLW91dCcsIGtleWZyYW1lcyhbXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCBvZmZzZXQ6IDB9KSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAuNSwgb2Zmc2V0OiAwLjN9KSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIG9mZnNldDogMX0pLFxuICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nMkRyb3Bkb3duTWVudSB7XG4gICAgLyoqXG4gICAgICogQG5hbWUgd2lkdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDQ7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gaWYgc2V0IHRvIHRydWUsIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBkcm9wZG93biB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZm9jdXNlZFxuICAgICAqIEBuYW1lIGZvY3VzRmlyc3RFbGVtZW50XG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIGZvY3VzRmlyc3RFbGVtZW50OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBzZXRzIGRyb3Bkb3duIG9mZnNldCBmcm9tIHRoZSBidXR0b25cbiAgICAgKiBAbmFtZSBvZmZzZXQge3N0cmluZ30gZm9sbG93IGZvcm1hdCAnPG51bWJlcj4gPG51bWJlcj4nIGV4LiAnMCAyMCdcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgb2Zmc2V0OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBhcHBlbmRUb0JvZHlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHpJbmRleFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB6SW5kZXggPSAxMDAwO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgaXRlbXNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE5nMk1lbnVJdGVtLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIHB1YmxpYyBpdGVtczogUXVlcnlMaXN0PE5nMk1lbnVJdGVtPjtcblxuICAgIHByaXZhdGUgcG9zaXRpb246IENsaWVudFJlY3Q7XG5cbiAgICBwcml2YXRlIGxpc3RlbmVyczogeyBhcnJvd0hhbmRsZXI/OiBGdW5jdGlvbiwgaGFuZGxlS2V5cHJlc3M/OiBGdW5jdGlvbiB9ID0ge1xuICAgICAgICBhcnJvd0hhbmRsZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgaGFuZGxlS2V5cHJlc3M6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGU6IERyb3Bkb3duU3RhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHNob3dcbiAgICAgKiBAc2hvd3MgbWVudSBhbmQgc2VsZWN0cyBmaXJzdCBpdGVtXG4gICAgICovXG4gICAgcHVibGljIHNob3cocG9zaXRpb24/OiBDbGllbnRSZWN0LCBkeW5hbWljID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgd2QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gc2V0dGluZyBoYW5kbGVyc1xuICAgICAgICAgICAgaWYgKGRjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MgPSB0aGlzLnJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgIC5saXN0ZW4oZGMuYm9keSwgJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleXByZXNzLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5hcnJvd0hhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih3ZCwgJ2tleWRvd24nLCBhcnJvd0tleXNIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgICAgICB0aGlzLnN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbihwb3NpdGlvbiwgZHluYW1pYyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBoaWRlXG4gICAgICogQGRlc2MgaGlkZXMgbWVudVxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvLyByZXNldCBzZWxlY3RlZCBpdGVtIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS51bnNlbGVjdCgpO1xuXG4gICAgICAgIC8vIGNhbGwgZnVuY3Rpb24gdG8gdW5saXN0ZW5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLmFycm93SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuYXJyb3dIYW5kbGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSB1cGRhdGVQb3NpdGlvblxuICAgICAqIEBkZXNjIHVwZGF0ZXMgdGhlIG1lbnUgcG9zaXRpb24gZXZlcnkgdGltZSBpdCBpcyB0b2dnbGVkXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIHtDbGllbnRSZWN0fVxuICAgICAqIEBwYXJhbSBkeW5hbWljIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbihwb3NpdGlvbjogQ2xpZW50UmVjdCwgZHluYW1pYzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMudXBkYXRlT25DaGFuZ2UoZHluYW1pYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgaGFuZGxlS2V5cHJlc3NcbiAgICAgKiBAZGVzYyBleGVjdXRlcyBmdW5jdGlvbnMgb24ga2V5UHJlc3MgYmFzZWQgb24gdGhlIGtleSBwcmVzc2VkXG4gICAgICogQHBhcmFtICRldmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVLZXlwcmVzcygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qga2V5ID0gJGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuaW5kZXhPZih0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0ZWRJdGVtISk7XG5cbiAgICAgICAgaWYgKCFBQ1RJT05TLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFDVElPTlNba2V5XS5jYWxsKHRoaXMsIGluZGV4LCBpdGVtcywgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBnZXRNZW51RWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0TWVudUVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBjYWxjUG9zaXRpb25PZmZzZXRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNQb3NpdGlvbk9mZnNldChwb3NpdGlvbik6IHsgdG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZyB9IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3Qgd2QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZGMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCF3ZCB8fCAhZGMgfHwgIXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRNZW51RWxlbWVudCgpO1xuICAgICAgICBjb25zdCBzdXBwb3J0UGFnZU9mZnNldCA9IHdkLnBhZ2VYT2Zmc2V0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGlzQ1NTMUNvbXBhdCA9ICgoZGMuY29tcGF0TW9kZSB8fCAnJykgPT09ICdDU1MxQ29tcGF0Jyk7XG5cbiAgICAgICAgY29uc3QgeCA9IHN1cHBvcnRQYWdlT2Zmc2V0ID8gd2QucGFnZVhPZmZzZXQgOiBpc0NTUzFDb21wYXQgP1xuICAgICAgICAgICAgZGMuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgOiBkYy5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgY29uc3QgeSA9IHN1cHBvcnRQYWdlT2Zmc2V0ID8gd2QucGFnZVlPZmZzZXQgOiBpc0NTUzFDb21wYXQgP1xuICAgICAgICAgICAgZGMuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IGRjLmJvZHkuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gdGhpcy5hcHBseU9mZnNldChcbiAgICAgICAgICAgIGAke3Bvc2l0aW9uLnRvcCArICh0aGlzLmFwcGVuZFRvQm9keSA/IHkgLSAxNSA6IDApfXB4YCxcbiAgICAgICAgICAgIGAke3Bvc2l0aW9uLmxlZnQgKyB4IC0gNX1weGBcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjbGllbnRXaWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IG1hcmdpbkZyb21Cb3R0b20gPSBwYXJzZUludCh0b3ApICsgY2xpZW50SGVpZ2h0ICsgKHRoaXMuYXBwZW5kVG9Cb2R5ID8gMCA6IHkgLSAxNSk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkZyb21SaWdodCA9IHBhcnNlSW50KGxlZnQpICsgY2xpZW50V2lkdGg7XG5cbiAgICAgICAgY29uc3Qgd2luZG93U2Nyb2xsSGVpZ2h0ID0gd2QuaW5uZXJIZWlnaHQgKyB3ZC5zY3JvbGxZO1xuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxXaWR0aCA9IHdkLmlubmVyV2lkdGggKyB3ZC5zY3JvbGxYO1xuXG4gICAgICAgIGlmIChtYXJnaW5Gcm9tQm90dG9tID49IHdpbmRvd1Njcm9sbEhlaWdodCkge1xuICAgICAgICAgICAgdG9wID0gYCR7cGFyc2VJbnQodG9wLnJlcGxhY2UoJ3B4JywgJycpKSAtIGNsaWVudEhlaWdodH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWFyZ2luRnJvbVJpZ2h0ID49IHdpbmRvd1Njcm9sbFdpZHRoKSB7XG4gICAgICAgICAgICBjb25zdCBtYXJnaW5SaWdodCA9IG1hcmdpbkZyb21SaWdodCAtIHdpbmRvd1Njcm9sbFdpZHRoICsgMzA7XG4gICAgICAgICAgICBsZWZ0ID0gYCR7cGFyc2VJbnQobGVmdC5yZXBsYWNlKCdweCcsICcnKSkgLSBtYXJnaW5SaWdodH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5T2Zmc2V0KHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcpOiB7IHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcgfSB7XG4gICAgICAgIGlmICghdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHRvcCwgbGVmdCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQuc3BsaXQoJyAnKTtcblxuICAgICAgICBpZiAoIW9mZnNldFsxXSkge1xuICAgICAgICAgICAgb2Zmc2V0WzFdID0gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wID0gYCR7cGFyc2VJbnQodG9wLnJlcGxhY2UoJ3B4JywgJycpKSArIHBhcnNlSW50KG9mZnNldFswXSl9cHhgO1xuICAgICAgICBsZWZ0ID0gYCR7cGFyc2VJbnQobGVmdC5yZXBsYWNlKCdweCcsICcnKSkgKyBwYXJzZUludChvZmZzZXRbMV0pfXB4YDtcblxuICAgICAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkgJiYgZGMpIHtcbiAgICAgICAgICAgIC8vIGFwcGVuZCBtZW51IGVsZW1lbnQgdG8gdGhlIGJvZHlcbiAgICAgICAgICAgIGRjLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU9uQ2hhbmdlKGR5bmFtaWMgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldE1lbnVFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYWxjUG9zaXRpb25PZmZzZXQodGhpcy5wb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShlbGVtZW50LCAndG9wJywgcG9zaXRpb24udG9wLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZWxlbWVudCwgJ2xlZnQnLCBwb3NpdGlvbi5sZWZ0LnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VsZWN0IGZpcnN0IGl0ZW0gdW5sZXNzIHVzZXIgZGlzYWJsZWQgdGhpcyBvcHRpb25cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNGaXJzdEVsZW1lbnQgJiZcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZmlyc3QgJiZcbiAgICAgICAgICAgICF0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0KHRoaXMuaXRlbXMuZmlyc3QsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5oYW5kbGVLZXlwcmVzcygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZzJEcm9wZG93bkJ1dHRvbiB9IGZyb20gJy4uL2J1dHRvbi9uZzItZHJvcGRvd24tYnV0dG9uJztcbmltcG9ydCB7IE5nMkRyb3Bkb3duTWVudSB9IGZyb20gJy4uL21lbnUvbmcyLWRyb3Bkb3duLW1lbnUnO1xuaW1wb3J0IHsgRHJvcGRvd25TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kcm9wZG93bi1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5nMk1lbnVJdGVtIH0gZnJvbSAnLi4vbWVudS1pdGVtL25nMi1tZW51LWl0ZW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nMi1kcm9wZG93bicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmcyLWRyb3Bkb3duLWNvbnRhaW5lclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5nMi1kcm9wZG93bi1idXR0b25cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmcyLWRyb3Bkb3duLW1lbnVcIj48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gICAgcHJvdmlkZXJzOiBbIERyb3Bkb3duU3RhdGVTZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgTmcyRHJvcGRvd24ge1xuICAgIC8vIGdldCBjaGlsZHJlbiBjb21wb25lbnRzXG4gICAgQENvbnRlbnRDaGlsZChOZzJEcm9wZG93bkJ1dHRvbikgcHVibGljIGJ1dHRvbjogTmcyRHJvcGRvd25CdXR0b247XG4gICAgQENvbnRlbnRDaGlsZChOZzJEcm9wZG93bk1lbnUpIHB1YmxpYyBtZW51OiBOZzJEcm9wZG93bk1lbnU7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgZHluYW1pY1VwZGF0ZSA9IHRydWU7XG5cbiAgICAvLyBvdXRwdXRzXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkl0ZW1DbGlja2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25JdGVtU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblNob3c6IEV2ZW50RW1pdHRlcjxOZzJEcm9wZG93bj4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nMkRyb3Bkb3duPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25IaWRlOiBFdmVudEVtaXR0ZXI8TmcyRHJvcGRvd24+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZzJEcm9wZG93bj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGU6IERyb3Bkb3duU3RhdGVTZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUub25JdGVtQ2xpY2tlZC5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrZWQuZW1pdChpdGVtKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmVudENsb3NlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhpZGUuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5vbk1lbnVUb2dnbGVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5vbkl0ZW1TZWxlY3RlZC5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5vbkl0ZW1EZXN0cm95ZWQuc3Vic2NyaWJlKChpdGVtOiBOZzJNZW51SXRlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1NlbGVjdGVkSXRlbTogTmcyTWVudUl0ZW0gfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMubWVudS5pdGVtcy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tZW51LmZvY3VzRmlyc3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWRJdGVtID0gaXRlbSA9PT0gaXRlbXNbMF0gJiYgaXRlbXMubGVuZ3RoID4gMSA/IGl0ZW1zWzFdIDogaXRlbXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3QobmV3U2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgdG9nZ2xlTWVudVxuICAgICAqIEBkZXNjIHRvZ2dsZXMgbWVudSB2aXNpYmlsaXR5XG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZU1lbnUocG9zaXRpb24gPSB0aGlzLmJ1dHRvbi5nZXRQb3NpdGlvbigpKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtIGhpZGVzIGRyb3Bkb3duXG4gICAgICogQG5hbWUgaGlkZVxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lbnUuaGlkZSgpO1xuICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIC0gc2hvd3MgZHJvcGRvd25cbiAgICAgKiBAbmFtZSBzaG93XG4gICAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAgICovXG4gICAgcHVibGljIHNob3cocG9zaXRpb24gPSB0aGlzLmJ1dHRvbi5nZXRQb3NpdGlvbigpKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVudS5zaG93KHBvc2l0aW9uLCB0aGlzLmR5bmFtaWNVcGRhdGUpO1xuICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHNjcm9sbExpc3RlbmVyXG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcpXG4gICAgcHVibGljIHNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b24gJiYgdGhpcy5keW5hbWljVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUudXBkYXRlUG9zaXRpb24odGhpcy5idXR0b24uZ2V0UG9zaXRpb24oKSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZzJEcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bi9uZzItZHJvcGRvd24nO1xuaW1wb3J0IHsgTmcyRHJvcGRvd25NZW51IH0gZnJvbSAnLi9jb21wb25lbnRzL21lbnUvbmcyLWRyb3Bkb3duLW1lbnUnO1xuaW1wb3J0IHsgTmcyRHJvcGRvd25CdXR0b24gfSBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uL25nMi1kcm9wZG93bi1idXR0b24nO1xuaW1wb3J0IHsgTmcyTWVudUl0ZW0gfSBmcm9tICcuL2NvbXBvbmVudHMvbWVudS1pdGVtL25nMi1tZW51LWl0ZW0nO1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERyb3Bkb3duU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kcm9wZG93bi1zdGF0ZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5nMk1lbnVJdGVtLFxuICAgICAgICBOZzJEcm9wZG93bkJ1dHRvbixcbiAgICAgICAgTmcyRHJvcGRvd25NZW51LFxuICAgICAgICBOZzJEcm9wZG93blxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE5nMkRyb3Bkb3duLFxuICAgICAgICBOZzJNZW51SXRlbSxcbiAgICAgICAgTmcyRHJvcGRvd25CdXR0b24sXG4gICAgICAgIE5nMkRyb3Bkb3duTWVudSxcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJEcm9wZG93bk1vZHVsZSB7fVxuXG5leHBvcnQge1xuICAgIE5nMkRyb3Bkb3duLFxuICAgIE5nMkRyb3Bkb3duTWVudSxcbiAgICBOZzJNZW51SXRlbSxcbiAgICBOZzJEcm9wZG93bkJ1dHRvbixcbiAgICBEcm9wZG93blN0YXRlU2VydmljZVxufVxuIl0sIm5hbWVzIjpbInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0lBMEJJLFlBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7NkJBSGlCLElBQUksWUFBWSxFQUFXO3lCQUM5QyxJQUFJO0tBRUU7Ozs7OztJQU1wQyxVQUFVO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFPM0IsV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Ozs7WUFqQy9ELFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixNQUFNLEVBQUUsQ0FBQyxvMkJBQW8yQixDQUFDO2dCQUM5MkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Q0FTYjthQUNBOzs7O1lBaEJHLFVBQVU7Ozs4QkFrQlQsTUFBTTswQkFDTixLQUFLOzs7Ozs7O0FDcEJWLHVCQUFNLElBQUksR0FBRztJQUNULFNBQVMsRUFBRSxDQUFDO0lBQ1osSUFBSSxFQUFFLEVBQUU7SUFDUixJQUFJLEVBQUUsRUFBRTtJQUNSLEtBQUssRUFBRSxFQUFFO0lBQ1QsTUFBTSxFQUFFLEVBQUU7Q0FDYixDQUFDOzs7Ozs7O0FBUUYsdUJBQU0sWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLEtBQW9CLEVBQUVBLFFBQXVCO0lBQzlFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzFCQSxRQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDeEM7Q0FDSixD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