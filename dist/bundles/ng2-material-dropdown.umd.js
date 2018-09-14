(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng2-material-dropdown', ['exports', '@angular/core', '@angular/animations', '@angular/common'], factory) :
    (factory((global['ng2-material-dropdown'] = {}),global.ng.core,global.ng.animations,global.ng.common));
}(this, (function (exports,core,animations,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2DropdownButton = (function () {
        function Ng2DropdownButton(element) {
            this.element = element;
            this.onMenuToggled = new core.EventEmitter();
            this.showCaret = true;
        }
        /**
         * \@name toggleMenu
         * @desc emits event to toggle menu
         * @return {?}
         */
        Ng2DropdownButton.prototype.toggleMenu = /**
         * \@name toggleMenu
         * @desc emits event to toggle menu
         * @return {?}
         */
            function () {
                this.onMenuToggled.emit(true);
            };
        /**
         * \@name getPosition
         * @desc returns position of the button
         * @return {?}
         */
        Ng2DropdownButton.prototype.getPosition = /**
         * \@name getPosition
         * @desc returns position of the button
         * @return {?}
         */
            function () {
                return this.element.nativeElement.getBoundingClientRect();
            };
        Ng2DropdownButton.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng2-dropdown-button',
                        styles: [".ng2-dropdown-button{font-family:Roboto,\"Helvetica Neue\",Helvetica,Arial;background:#fff;padding:.45rem .25rem;font-size:14px;letter-spacing:.08rem;color:#444;outline:0;cursor:pointer;font-weight:400;border:none;border-bottom:1px solid #efefef;text-align:left;min-width:100px;width:100%;display:flex;flex-direction:row;max-width:150px}.ng2-dropdown-button:hover{color:#222}.ng2-dropdown-button:active,.ng2-dropdown-button:focus{color:#222;border-bottom:2px solid #2196f3}.ng2-dropdown-button__label{flex:1 1 95%}.ng2-dropdown-button__caret{width:12px;height:12px;display:flex;flex:1 1 6%}:host-context(.ng2-dropdown-button--icon) .ng2-dropdown-button{border:none;min-width:40px;width:40px;border-radius:100%;transition:all .2s;text-align:center;height:40px;padding:.5em}:host-context(.ng2-dropdown-button--icon) .ng2-dropdown-button:active{background:rgba(0,0,0,.2)}"],
                        template: "<button class='ng2-dropdown-button' type=\"button\" (click)=\"toggleMenu()\" tabindex=\"0s\">\n    <span class=\"ng2-dropdown-button__label\">\n        <ng-content></ng-content>\n    </span>\n\n    <span class=\"ng2-dropdown-button__caret\" *ngIf=\"showCaret\">\n        <svg enable-background=\"new 0 0 32 32\" height=\"16px\" id=\"\u0421\u043B\u043E\u0439_1\" version=\"1.1\" viewBox=\"0 0 32 32\" width=\"16px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002  c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z\" fill=\"#121313\" id=\"Expand_More\"/><g/><g/><g/><g/><g/><g/></svg>\n    </span>\n</button>\n"
                    },] },
        ];
        /** @nocollapse */
        Ng2DropdownButton.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
            ];
        };
        Ng2DropdownButton.propDecorators = {
            "onMenuToggled": [{ type: core.Output },],
            "showCaret": [{ type: core.Input },],
        };
        return Ng2DropdownButton;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ KEYS = {
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
    var /** @type {?} */ onSwitchNext = function (index, items, state) {
        if (index < items.length - 1) {
            state.select(items[index + 1], true);
        }
    };
    /**
     * \@name onSwitchPrev
     * @param index
     * @param items
     * @param state
     */
    var /** @type {?} */ onSwitchPrev = function (index, items, state) {
        if (index > 0) {
            state.select(items[index - 1], true);
        }
    };
    /**
     * \@name onBackspace
     * @param index
     * @param items
     * @param state
     */
    var /** @type {?} */ onBackspace = function (index, items, state) {
        if (index < items.length - 1) {
            state.select(items[index + 1], true);
        }
        else {
            state.select(items[0], true);
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
    var /** @type {?} */ onItemClicked = function (index, items, state) {
        return state.selectedItem ? state.selectedItem.click() : undefined;
    };
    var /** @type {?} */ ACTIONS = (_a = {},
        _a[KEYS.BACKSPACE] = onBackspace,
        _a[KEYS.PREV] = onSwitchPrev,
        _a[KEYS.NEXT] = onSwitchNext,
        _a[KEYS.ENTER] = onItemClicked,
        _a[KEYS.ESCAPE] = onEscape,
        _a);
    /**
     * @param {?} event
     * @return {?}
     */
    function arrowKeysHandler(event) {
        if ([38, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
    }
    var _a;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2DropdownState = (function () {
        function Ng2DropdownState() {
            this.onItemSelected = new core.EventEmitter();
            this.onItemClicked = new core.EventEmitter();
            this.onItemDestroyed = new core.EventEmitter();
        }
        Object.defineProperty(Ng2DropdownState.prototype, "selectedItem", {
            get: /**
             * \@name selectedItem
             * @desc getter for _selectedItem
             * @return {?}
             */ function () {
                return this._selectedItem;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * \@name selects a menu item and emits event
         * @param {?} item
         * @param {?=} dispatchEvent
         * @return {?}
         */
        Ng2DropdownState.prototype.select = /**
         * \@name selects a menu item and emits event
         * @param {?} item
         * @param {?=} dispatchEvent
         * @return {?}
         */
            function (item, dispatchEvent) {
                if (dispatchEvent === void 0) {
                    dispatchEvent = true;
                }
                this._selectedItem = item;
                if (!dispatchEvent || !item) {
                    return;
                }
                item.focus();
                this.onItemSelected.emit(item);
            };
        /**
         * \@name unselect
         * @desc sets _selectedItem as undefined
         * @return {?}
         */
        Ng2DropdownState.prototype.unselect = /**
         * \@name unselect
         * @desc sets _selectedItem as undefined
         * @return {?}
         */
            function () {
                this._selectedItem = undefined;
            };
        return Ng2DropdownState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DropdownStateService = (function () {
        function DropdownStateService() {
            this.menuState = {
                isVisible: /** @type {?} */ (false),
                toString: /**
                 * @return {?}
                 */ function () {
                    return this.isVisible === true ? 'visible' : 'hidden';
                }
            };
            this.dropdownState = new Ng2DropdownState();
        }
        DropdownStateService.decorators = [
            { type: core.Injectable },
        ];
        return DropdownStateService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2MenuItem = (function () {
        function Ng2MenuItem(state, element, renderer) {
            this.state = state;
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
        Ng2MenuItem.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.state.dropdownState.onItemDestroyed.emit(this);
            };
        Object.defineProperty(Ng2MenuItem.prototype, "isSelected", {
            get: /**
             * \@name isSelected
             * @desc returns current selected item
             * @return {?}
             */ function () {
                return this === this.state.dropdownState.selectedItem;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * \@name click
         * @desc emits select event
         * @param {?=} $event
         * @return {?}
         */
        Ng2MenuItem.prototype.select = /**
         * \@name click
         * @desc emits select event
         * @param {?=} $event
         * @return {?}
         */
            function ($event) {
                this.state.dropdownState.select(this, true);
                if ($event) {
                    $event.stopPropagation();
                    $event.preventDefault();
                }
            };
        /**
         * \@name click
         * @desc emits click event
         * @return {?}
         */
        Ng2MenuItem.prototype.click = /**
         * \@name click
         * @desc emits click event
         * @return {?}
         */
            function () {
                this.state.dropdownState.onItemClicked.emit(this);
            };
        /**
         * \@name focus
         * @return {?}
         */
        Ng2MenuItem.prototype.focus = /**
         * \@name focus
         * @return {?}
         */
            function () {
                this.renderer.invokeElementMethod(this.element.nativeElement.children[0], 'focus');
            };
        Ng2MenuItem.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng2-menu-item',
                        styles: [".ng2-menu-item{font-family:Roboto,\"Helvetica Neue\",Helvetica,Arial;background:#fff;color:rgba(0,0,0,.87);cursor:pointer;font-size:.9em;text-transform:none;font-weight:400;letter-spacing:.03em;height:48px;line-height:48px;padding:.3em 1.25rem;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;transition:background .25s}.ng2-menu-item--selected{background:rgba(158,158,158,.2);outline:0}.ng2-menu-item:focus{outline:0}.ng2-menu-item:active{background:rgba(158,158,158,.4)}:host(ng2-menu-item) /deep/ [ng2-menu-item-icon]{vertical-align:middle;font-size:28px;width:1.5em;height:30px;color:rgba(0,0,0,.44)}"],
                        template: "<div class='ng2-menu-item'\n     role=\"button\"\n     tabindex=\"0\"\n     [class.ng2-menu-item--selected]=\"isSelected\"\n     (keydown.enter)=\"click()\"\n     (click)=\"click()\"\n     (mouseover)=\"select()\">\n        <ng-content></ng-content>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        Ng2MenuItem.ctorParameters = function () {
            return [
                { type: DropdownStateService, },
                { type: core.ElementRef, },
                { type: core.Renderer, },
            ];
        };
        Ng2MenuItem.propDecorators = {
            "preventClose": [{ type: core.Input },],
            "value": [{ type: core.Input },],
        };
        return Ng2MenuItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2DropdownMenu = (function () {
        function Ng2DropdownMenu(state, element, renderer) {
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
        Ng2DropdownMenu.prototype.show = /**
         * \@name show
         * \@shows menu and selects first item
         * @param {?=} position
         * @param {?=} dynamic
         * @return {?}
         */
            function (position, dynamic) {
                if (dynamic === void 0) {
                    dynamic = true;
                }
                var /** @type {?} */ dc = typeof document !== 'undefined' ? document : undefined;
                var /** @type {?} */ wd = typeof window !== 'undefined' ? window : undefined;
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
            };
        /**
         * \@name hide
         * @desc hides menu
         * @return {?}
         */
        Ng2DropdownMenu.prototype.hide = /**
         * \@name hide
         * @desc hides menu
         * @return {?}
         */
            function () {
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
            };
        /**
         * \@name updatePosition
         * @desc updates the menu position every time it is toggled
         * @param {?} position {ClientRect}
         * @param {?} dynamic {boolean}
         * @return {?}
         */
        Ng2DropdownMenu.prototype.updatePosition = /**
         * \@name updatePosition
         * @desc updates the menu position every time it is toggled
         * @param {?} position {ClientRect}
         * @param {?} dynamic {boolean}
         * @return {?}
         */
            function (position, dynamic) {
                this.position = position;
                this.updateOnChange(dynamic);
            };
        /**
         * \@name handleKeypress
         * @desc executes functions on keyPress based on the key pressed
         * @param {?} $event
         * @return {?}
         */
        Ng2DropdownMenu.prototype.handleKeypress = /**
         * \@name handleKeypress
         * @desc executes functions on keyPress based on the key pressed
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                var /** @type {?} */ key = $event.keyCode;
                var /** @type {?} */ items = this.items.toArray();
                var /** @type {?} */ index = items.indexOf(/** @type {?} */ ((this.state.dropdownState.selectedItem)));
                if (!ACTIONS.hasOwnProperty(key)) {
                    return;
                }
                ACTIONS[key].call(this, index, items, this.state.dropdownState);
            };
        /**
         * \@name getMenuElement
         * @return {?}
         */
        Ng2DropdownMenu.prototype.getMenuElement = /**
         * \@name getMenuElement
         * @return {?}
         */
            function () {
                return this.element.nativeElement.children[0];
            };
        /**
         * \@name calcPositionOffset
         * @param {?} position
         * @return {?}
         */
        Ng2DropdownMenu.prototype.calcPositionOffset = /**
         * \@name calcPositionOffset
         * @param {?} position
         * @return {?}
         */
            function (position) {
                var /** @type {?} */ wd = typeof window !== 'undefined' ? window : undefined;
                var /** @type {?} */ dc = typeof document !== 'undefined' ? document : undefined;
                if (!wd || !dc || !position) {
                    return;
                }
                var /** @type {?} */ element = this.getMenuElement();
                var /** @type {?} */ supportPageOffset = wd.pageXOffset !== undefined;
                var /** @type {?} */ isCSS1Compat = ((dc.compatMode || '') === 'CSS1Compat');
                var /** @type {?} */ x = supportPageOffset ? wd.pageXOffset : isCSS1Compat ?
                    dc.documentElement.scrollLeft : dc.body.scrollLeft;
                var /** @type {?} */ y = supportPageOffset ? wd.pageYOffset : isCSS1Compat ?
                    dc.documentElement.scrollTop : dc.body.scrollTop;
                var _a = this.applyOffset(position.top + (this.appendToBody ? y - 15 : 0) + "px", position.left + x - 5 + "px"), top = _a.top, left = _a.left;
                var /** @type {?} */ clientWidth = element.clientWidth;
                var /** @type {?} */ clientHeight = element.clientHeight;
                var /** @type {?} */ marginFromBottom = parseInt(top) + clientHeight + (this.appendToBody ? 0 : y - 15);
                var /** @type {?} */ marginFromRight = parseInt(left) + clientWidth;
                var /** @type {?} */ windowScrollHeight = wd.innerHeight + wd.scrollY;
                var /** @type {?} */ windowScrollWidth = wd.innerWidth + wd.scrollX;
                if (marginFromBottom >= windowScrollHeight) {
                    top = parseInt(top.replace('px', '')) - clientHeight + "px";
                }
                if (marginFromRight >= windowScrollWidth) {
                    var /** @type {?} */ marginRight = marginFromRight - windowScrollWidth + 30;
                    left = parseInt(left.replace('px', '')) - marginRight + "px";
                }
                return { top: top, left: left };
            };
        /**
         * @param {?} top
         * @param {?} left
         * @return {?}
         */
        Ng2DropdownMenu.prototype.applyOffset = /**
         * @param {?} top
         * @param {?} left
         * @return {?}
         */
            function (top, left) {
                if (!this.offset) {
                    return { top: top, left: left };
                }
                var /** @type {?} */ offset = this.offset.split(' ');
                if (!offset[1]) {
                    offset[1] = '0';
                }
                top = parseInt(top.replace('px', '')) + parseInt(offset[0]) + "px";
                left = parseInt(left.replace('px', '')) + parseInt(offset[1]) + "px";
                return { top: top, left: left };
            };
        /**
         * @return {?}
         */
        Ng2DropdownMenu.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ dc = typeof document !== 'undefined' ? document : undefined;
                if (this.appendToBody && dc) {
                    // append menu element to the body
                    dc.body.appendChild(this.element.nativeElement);
                }
            };
        /**
         * @param {?=} dynamic
         * @return {?}
         */
        Ng2DropdownMenu.prototype.updateOnChange = /**
         * @param {?=} dynamic
         * @return {?}
         */
            function (dynamic) {
                if (dynamic === void 0) {
                    dynamic = true;
                }
                var /** @type {?} */ element = this.getMenuElement();
                var /** @type {?} */ position = this.calcPositionOffset(this.position);
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
            };
        /**
         * @return {?}
         */
        Ng2DropdownMenu.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ elem = this.element.nativeElement;
                elem.parentNode.removeChild(elem);
                if (this.listeners.handleKeypress) {
                    this.listeners.handleKeypress();
                }
            };
        Ng2DropdownMenu.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng2-dropdown-menu',
                        styles: [":host{display:block}.ng2-dropdown-menu{overflow-y:auto;box-shadow:0 1px 2px 0 rgba(0,0,0,.3);position:absolute;padding:.5em 0;background:#fff;border-radius:1px;max-height:400px;width:260px;min-height:0;display:block}.ng2-dropdown-menu.ng2-dropdown-menu--inside-element{position:fixed}.ng2-dropdown-menu.ng2-dropdown-menu--width--2{width:200px}.ng2-dropdown-menu.ng2-dropdown-menu--width--4{width:260px}.ng2-dropdown-menu.ng2-dropdown-menu--width--6{width:320px}.ng2-dropdown-backdrop{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:hidden}:host /deep/ .ng2-menu-divider{height:1px;min-height:1px;max-height:1px;width:100%;display:block;background:#f9f9f9}"],
                        template: "<!-- MENU -->\n<div class='ng2-dropdown-menu ng2-dropdown-menu---width--{{ width }}'\n     [class.ng2-dropdown-menu--inside-element]=\"!appendToBody\"\n     [class.ng2-dropdown-menu--open]=\"state.menuState.isVisible\"\n     [style.z-index]=\"zIndex\"\n     [@fade]=\"state.menuState.toString()\">\n        <div class=\"ng2-dropdown-menu__options-container\"\n             [@opacity]=\"state.menuState.toString()\">\n            <ng-content></ng-content>\n        </div>\n</div>\n\n<!-- BACKDROP -->\n<div class=\"ng2-dropdown-backdrop\" *ngIf=\"state.menuState.isVisible\" (click)=\"hide()\"></div>\n",
                        animations: [
                            animations.trigger('fade', [
                                animations.state('visible', animations.style({ display: 'block', opacity: 1, height: '*', width: '*' })),
                                animations.state('hidden', animations.style({ display: 'none', opacity: 0, overflow: 'hidden', height: 0, width: 0 })),
                                animations.transition('hidden => visible', [
                                    animations.animate('250ms ease-in', animations.style({ opacity: 1, height: '*', width: '*' }))
                                ]),
                                animations.transition('visible => hidden', [
                                    animations.animate('350ms ease-out', animations.style({ opacity: 0, width: 0, height: 0 }))
                                ])
                            ]),
                            animations.trigger('opacity', [
                                animations.transition('hidden => visible', [
                                    animations.animate('450ms ease-in', animations.keyframes([
                                        animations.style({ opacity: 0, offset: 0 }),
                                        animations.style({ opacity: 1, offset: 1 }),
                                    ]))
                                ]),
                                animations.transition('visible => hidden', [
                                    animations.animate('250ms ease-out', animations.keyframes([
                                        animations.style({ opacity: 1, offset: 0 }),
                                        animations.style({ opacity: 0.5, offset: 0.3 }),
                                        animations.style({ opacity: 0, offset: 1 }),
                                    ]))
                                ])
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        Ng2DropdownMenu.ctorParameters = function () {
            return [
                { type: DropdownStateService, },
                { type: core.ElementRef, },
                { type: core.Renderer, },
            ];
        };
        Ng2DropdownMenu.propDecorators = {
            "width": [{ type: core.Input },],
            "focusFirstElement": [{ type: core.Input },],
            "offset": [{ type: core.Input },],
            "appendToBody": [{ type: core.Input },],
            "zIndex": [{ type: core.Input },],
            "items": [{ type: core.ContentChildren, args: [Ng2MenuItem, { descendants: true },] },],
        };
        return Ng2DropdownMenu;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2Dropdown = (function () {
        function Ng2Dropdown(state) {
            this.state = state;
            this.dynamicUpdate = true;
            // outputs
            this.onItemClicked = new core.EventEmitter();
            this.onItemSelected = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        Ng2Dropdown.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.state.dropdownState.onItemClicked.subscribe(function (item) {
                    _this.onItemClicked.emit(item);
                    if (item.preventClose) {
                        return;
                    }
                    _this.hide.call(_this);
                });
                if (this.button) {
                    this.button.onMenuToggled.subscribe(function () {
                        _this.toggleMenu();
                    });
                }
                this.state.dropdownState.onItemSelected.subscribe(function (item) {
                    _this.onItemSelected.emit(item);
                });
                this.state.dropdownState.onItemDestroyed.subscribe(function (item) {
                    var /** @type {?} */ newSelectedItem;
                    var /** @type {?} */ items = _this.menu.items.toArray();
                    if (item !== _this.state.dropdownState.selectedItem) {
                        return;
                    }
                    if (_this.menu.focusFirstElement) {
                        newSelectedItem = item === items[0] && items.length > 1 ? items[1] : items[0];
                    }
                    _this.state.dropdownState.select(newSelectedItem);
                });
            };
        /**
         * \@name toggleMenu
         * @desc toggles menu visibility
         * @param {?=} position
         * @return {?}
         */
        Ng2Dropdown.prototype.toggleMenu = /**
         * \@name toggleMenu
         * @desc toggles menu visibility
         * @param {?=} position
         * @return {?}
         */
            function (position) {
                if (position === void 0) {
                    position = this.button.getPosition();
                }
                this.state.menuState.isVisible ? this.hide() : this.show(position);
            };
        /**
         * - hides dropdown
         * \@name hide
         * @return {?}
         */
        Ng2Dropdown.prototype.hide = /**
         * - hides dropdown
         * \@name hide
         * @return {?}
         */
            function () {
                this.menu.hide();
                this.onHide.emit(this);
            };
        /**
         * - shows dropdown
         * \@name show
         * @param {?=} position
         * @return {?}
         */
        Ng2Dropdown.prototype.show = /**
         * - shows dropdown
         * \@name show
         * @param {?=} position
         * @return {?}
         */
            function (position) {
                if (position === void 0) {
                    position = this.button.getPosition();
                }
                this.menu.show(position, this.dynamicUpdate);
                this.onShow.emit(this);
            };
        /**
         * \@name scrollListener
         * @return {?}
         */
        Ng2Dropdown.prototype.scrollListener = /**
         * \@name scrollListener
         * @return {?}
         */
            function () {
                if (this.button && this.dynamicUpdate) {
                    this.menu.updatePosition(this.button.getPosition(), true);
                }
            };
        Ng2Dropdown.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng2-dropdown',
                        template: "<div class=\"ng2-dropdown-container\">\n    <ng-content select=\"ng2-dropdown-button\"></ng-content>\n    <ng-content select=\"ng2-dropdown-menu\"></ng-content>\n</div>\n",
                        providers: [DropdownStateService]
                    },] },
        ];
        /** @nocollapse */
        Ng2Dropdown.ctorParameters = function () {
            return [
                { type: DropdownStateService, },
            ];
        };
        Ng2Dropdown.propDecorators = {
            "button": [{ type: core.ContentChild, args: [Ng2DropdownButton,] },],
            "menu": [{ type: core.ContentChild, args: [Ng2DropdownMenu,] },],
            "dynamicUpdate": [{ type: core.Input },],
            "onItemClicked": [{ type: core.Output },],
            "onItemSelected": [{ type: core.Output },],
            "onShow": [{ type: core.Output },],
            "onHide": [{ type: core.Output },],
            "scrollListener": [{ type: core.HostListener, args: ['window:scroll',] },],
        };
        return Ng2Dropdown;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Ng2DropdownModule = (function () {
        function Ng2DropdownModule() {
        }
        Ng2DropdownModule.decorators = [
            { type: core.NgModule, args: [{
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
                            common.CommonModule
                        ]
                    },] },
        ];
        return Ng2DropdownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.Ng2Dropdown = Ng2Dropdown;
    exports.Ng2DropdownMenu = Ng2DropdownMenu;
    exports.Ng2MenuItem = Ng2MenuItem;
    exports.Ng2DropdownButton = Ng2DropdownButton;
    exports.Ng2DropdownModule = Ng2DropdownModule;
    exports.DropdownStateService = DropdownStateService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW1hdGVyaWFsLWRyb3Bkb3duLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmcyLW1hdGVyaWFsLWRyb3Bkb3duL3NyYy9tb2R1bGVzL2NvbXBvbmVudHMvYnV0dG9uL25nMi1kcm9wZG93bi1idXR0b24udHMiLCJuZzovL25nMi1tYXRlcmlhbC1kcm9wZG93bi9zcmMvbW9kdWxlcy9jb21wb25lbnRzL21lbnUvYWN0aW9ucy50cyIsIm5nOi8vbmcyLW1hdGVyaWFsLWRyb3Bkb3duL3NyYy9tb2R1bGVzL3NlcnZpY2VzL25nMi1kcm9wZG93bi1zdGF0ZS50cyIsIm5nOi8vbmcyLW1hdGVyaWFsLWRyb3Bkb3duL3NyYy9tb2R1bGVzL3NlcnZpY2VzL2Ryb3Bkb3duLXN0YXRlLnNlcnZpY2UudHMiLCJuZzovL25nMi1tYXRlcmlhbC1kcm9wZG93bi9zcmMvbW9kdWxlcy9jb21wb25lbnRzL21lbnUtaXRlbS9uZzItbWVudS1pdGVtLnRzIiwibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vc3JjL21vZHVsZXMvY29tcG9uZW50cy9tZW51L25nMi1kcm9wZG93bi1tZW51LnRzIiwibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vc3JjL21vZHVsZXMvY29tcG9uZW50cy9kcm9wZG93bi9uZzItZHJvcGRvd24udHMiLCJuZzovL25nMi1tYXRlcmlhbC1kcm9wZG93bi9zcmMvbW9kdWxlcy9uZzItZHJvcGRvd24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIE91dHB1dCxcbiAgICBJbnB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZzItZHJvcGRvd24tYnV0dG9uJyxcbiAgICBzdHlsZXM6IFtgLm5nMi1kcm9wZG93bi1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixIZWx2ZXRpY2EsQXJpYWw7YmFja2dyb3VuZDojZmZmO3BhZGRpbmc6LjQ1cmVtIC4yNXJlbTtmb250LXNpemU6MTRweDtsZXR0ZXItc3BhY2luZzouMDhyZW07Y29sb3I6IzQ0NDtvdXRsaW5lOjA7Y3Vyc29yOnBvaW50ZXI7Zm9udC13ZWlnaHQ6NDAwO2JvcmRlcjpub25lO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZmVmZWY7dGV4dC1hbGlnbjpsZWZ0O21pbi13aWR0aDoxMDBweDt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7bWF4LXdpZHRoOjE1MHB4fS5uZzItZHJvcGRvd24tYnV0dG9uOmhvdmVye2NvbG9yOiMyMjJ9Lm5nMi1kcm9wZG93bi1idXR0b246YWN0aXZlLC5uZzItZHJvcGRvd24tYnV0dG9uOmZvY3Vze2NvbG9yOiMyMjI7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzIxOTZmM30ubmcyLWRyb3Bkb3duLWJ1dHRvbl9fbGFiZWx7ZmxleDoxIDEgOTUlfS5uZzItZHJvcGRvd24tYnV0dG9uX19jYXJldHt3aWR0aDoxMnB4O2hlaWdodDoxMnB4O2Rpc3BsYXk6ZmxleDtmbGV4OjEgMSA2JX06aG9zdC1jb250ZXh0KC5uZzItZHJvcGRvd24tYnV0dG9uLS1pY29uKSAubmcyLWRyb3Bkb3duLWJ1dHRvbntib3JkZXI6bm9uZTttaW4td2lkdGg6NDBweDt3aWR0aDo0MHB4O2JvcmRlci1yYWRpdXM6MTAwJTt0cmFuc2l0aW9uOmFsbCAuMnM7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjQwcHg7cGFkZGluZzouNWVtfTpob3N0LWNvbnRleHQoLm5nMi1kcm9wZG93bi1idXR0b24tLWljb24pIC5uZzItZHJvcGRvd24tYnV0dG9uOmFjdGl2ZXtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjIpfWBdLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiBjbGFzcz0nbmcyLWRyb3Bkb3duLWJ1dHRvbicgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVNZW51KClcIiB0YWJpbmRleD1cIjBzXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJuZzItZHJvcGRvd24tYnV0dG9uX19sYWJlbFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJuZzItZHJvcGRvd24tYnV0dG9uX19jYXJldFwiICpuZ0lmPVwic2hvd0NhcmV0XCI+XG4gICAgICAgIDxzdmcgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDMyIDMyXCIgaGVpZ2h0PVwiMTZweFwiIGlkPVwiw5DCocOQwrvDkMK+w5DCuV8xXCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIiB3aWR0aD1cIjE2cHhcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIj48cGF0aCBkPVwiTTI0LjI4NSwxMS4yODRMMTYsMTkuNTcxbC04LjI4NS04LjI4OGMtMC4zOTUtMC4zOTUtMS4wMzQtMC4zOTUtMS40MjksMCAgYy0wLjM5NCwwLjM5NS0wLjM5NCwxLjAzNSwwLDEuNDNsOC45OTksOS4wMDJsMCwwbDAsMGMwLjM5NCwwLjM5NSwxLjAzNCwwLjM5NSwxLjQyOCwwbDguOTk5LTkuMDAyICBjMC4zOTQtMC4zOTUsMC4zOTQtMS4wMzYsMC0xLjQzMUMyNS4zMTksMTAuODg5LDI0LjY3OSwxMC44ODksMjQuMjg1LDExLjI4NHpcIiBmaWxsPVwiIzEyMTMxM1wiIGlkPVwiRXhwYW5kX01vcmVcIi8+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+XG4gICAgPC9zcGFuPlxuPC9idXR0b24+XG5gXG59KVxuZXhwb3J0IGNsYXNzIE5nMkRyb3Bkb3duQnV0dG9uIHtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uTWVudVRvZ2dsZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0NhcmV0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHRvZ2dsZU1lbnVcbiAgICAgKiBAZGVzYyBlbWl0cyBldmVudCB0byB0b2dnbGUgbWVudVxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVNZW51KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTWVudVRvZ2dsZWQuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBnZXRQb3NpdGlvblxuICAgICAqIEBkZXNjIHJldHVybnMgcG9zaXRpb24gb2YgdGhlIGJ1dHRvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpOiBDbGllbnRSZWN0IHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZzJNZW51SXRlbSB9IGZyb20gJy4uL21lbnUtaXRlbS9uZzItbWVudS1pdGVtJztcbmltcG9ydCB7IE5nMkRyb3Bkb3duTWVudSB9IGZyb20gJy4vbmcyLWRyb3Bkb3duLW1lbnUnO1xuaW1wb3J0IHsgTmcyRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25nMi1kcm9wZG93bi1zdGF0ZSc7XG5cbmNvbnN0IEtFWVMgPSB7XG4gICAgQkFDS1NQQUNFOiA5LFxuICAgIFBSRVY6IDM4LFxuICAgIE5FWFQ6IDQwLFxuICAgIEVOVEVSOiAxMyxcbiAgICBFU0NBUEU6IDI3XG59O1xuXG4vKipcbiAqIEBuYW1lIG9uU3dpdGNoTmV4dFxuICogQHBhcmFtIGluZGV4XG4gKiBAcGFyYW0gaXRlbXNcbiAqIEBwYXJhbSBzdGF0ZVxuICovXG5jb25zdCBvblN3aXRjaE5leHQgPSAoaW5kZXg6IG51bWJlciwgaXRlbXM6IE5nMk1lbnVJdGVtW10sIHN0YXRlOiBOZzJEcm9wZG93blN0YXRlKSA9PiB7XG4gICAgaWYgKGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3QoaXRlbXNbaW5kZXggKyAxXSwgdHJ1ZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBAbmFtZSBvblN3aXRjaFByZXZcbiAqIEBwYXJhbSBpbmRleFxuICogQHBhcmFtIGl0ZW1zXG4gKiBAcGFyYW0gc3RhdGVcbiAqL1xuY29uc3Qgb25Td2l0Y2hQcmV2ID0gKGluZGV4OiBudW1iZXIsIGl0ZW1zOiBOZzJNZW51SXRlbVtdLCBzdGF0ZTogTmcyRHJvcGRvd25TdGF0ZSkgPT4ge1xuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0KGl0ZW1zW2luZGV4IC0gMV0sIHRydWUpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQG5hbWUgb25CYWNrc3BhY2VcbiAqIEBwYXJhbSBpbmRleFxuICogQHBhcmFtIGl0ZW1zXG4gKiBAcGFyYW0gc3RhdGVcbiAqL1xuY29uc3Qgb25CYWNrc3BhY2UgPSAoaW5kZXg6IG51bWJlciwgaXRlbXM6IE5nMk1lbnVJdGVtW10sIHN0YXRlOiBOZzJEcm9wZG93blN0YXRlKSA9PiB7XG4gICAgaWYgKGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3QoaXRlbXNbaW5kZXggKyAxXSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0KGl0ZW1zWzBdLCB0cnVlKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBvbkVzY2FwZSh0aGlzOiBOZzJEcm9wZG93bk1lbnUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbn07XG5cbi8qKlxuICogQG5hbWUgb25JdGVtQ2xpY2tlZFxuICogQHBhcmFtIGluZGV4XG4gKiBAcGFyYW0gaXRlbXNcbiAqIEBwYXJhbSBzdGF0ZVxuICovXG5jb25zdCBvbkl0ZW1DbGlja2VkID0gKGluZGV4OiBudW1iZXIsIGl0ZW1zOiBOZzJNZW51SXRlbVtdLCBzdGF0ZTogTmcyRHJvcGRvd25TdGF0ZSkgPT4ge1xuICAgIHJldHVybiBzdGF0ZS5zZWxlY3RlZEl0ZW0gPyBzdGF0ZS5zZWxlY3RlZEl0ZW0uY2xpY2soKSA6IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBBQ1RJT05TID0ge1xuICAgIFtLRVlTLkJBQ0tTUEFDRV06IG9uQmFja3NwYWNlLFxuICAgIFtLRVlTLlBSRVZdOiBvblN3aXRjaFByZXYsXG4gICAgW0tFWVMuTkVYVF06IG9uU3dpdGNoTmV4dCxcbiAgICBbS0VZUy5FTlRFUl06IG9uSXRlbUNsaWNrZWQsXG4gICAgW0tFWVMuRVNDQVBFXTogb25Fc2NhcGVcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJvd0tleXNIYW5kbGVyKGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKFszOCwgNDBdLmluZGV4T2YoZXZlbnQua2V5Q29kZSkgPiAtMSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmcyTWVudUl0ZW0gfSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUtaXRlbS9uZzItbWVudS1pdGVtJztcblxuZXhwb3J0IGNsYXNzIE5nMkRyb3Bkb3duU3RhdGUge1xuICAgIHB1YmxpYyBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPE5nMk1lbnVJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmcyTWVudUl0ZW0+KCk7XG4gICAgcHVibGljIG9uSXRlbUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxOZzJNZW51SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nMk1lbnVJdGVtPigpO1xuICAgIHB1YmxpYyBvbkl0ZW1EZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxOZzJNZW51SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nMk1lbnVJdGVtPigpO1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtPzogTmcyTWVudUl0ZW07XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBzZWxlY3RlZEl0ZW1cbiAgICAgKiBAZGVzYyBnZXR0ZXIgZm9yIF9zZWxlY3RlZEl0ZW1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkSXRlbSgpOiBOZzJNZW51SXRlbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgc2VsZWN0cyBhIG1lbnUgaXRlbSBhbmQgZW1pdHMgZXZlbnRcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3QoaXRlbTogTmcyTWVudUl0ZW0gfCB1bmRlZmluZWQsIGRpc3BhdGNoRXZlbnQgPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IGl0ZW07XG5cbiAgICAgICAgaWYgKCFkaXNwYXRjaEV2ZW50IHx8ICFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHVuc2VsZWN0XG4gICAgICogQGRlc2Mgc2V0cyBfc2VsZWN0ZWRJdGVtIGFzIHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHB1YmxpYyB1bnNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nMkRyb3Bkb3duU3RhdGUgfSBmcm9tICcuL25nMi1kcm9wZG93bi1zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcm9wZG93blN0YXRlU2VydmljZSB7XG4gICAgcHVibGljIG1lbnVTdGF0ZSA9IHtcbiAgICAgICAgaXNWaXNpYmxlOiA8Ym9vbGVhbj5mYWxzZSxcbiAgICAgICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzVmlzaWJsZSA9PT0gdHJ1ZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHB1YmxpYyBkcm9wZG93blN0YXRlOiBOZzJEcm9wZG93blN0YXRlID0gbmV3IE5nMkRyb3Bkb3duU3RhdGUoKTtcbn1cbiIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIFJlbmRlcmVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEcm9wZG93blN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Ryb3Bkb3duLXN0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nMi1tZW51LWl0ZW0nLFxuICAgIHN0eWxlczogW2AubmcyLW1lbnUtaXRlbXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLEhlbHZldGljYSxBcmlhbDtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6cmdiYSgwLDAsMCwuODcpO2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZTouOWVtO3RleHQtdHJhbnNmb3JtOm5vbmU7Zm9udC13ZWlnaHQ6NDAwO2xldHRlci1zcGFjaW5nOi4wM2VtO2hlaWdodDo0OHB4O2xpbmUtaGVpZ2h0OjQ4cHg7cGFkZGluZzouM2VtIDEuMjVyZW07dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zaXRpb246YmFja2dyb3VuZCAuMjVzfS5uZzItbWVudS1pdGVtLS1zZWxlY3RlZHtiYWNrZ3JvdW5kOnJnYmEoMTU4LDE1OCwxNTgsLjIpO291dGxpbmU6MH0ubmcyLW1lbnUtaXRlbTpmb2N1c3tvdXRsaW5lOjB9Lm5nMi1tZW51LWl0ZW06YWN0aXZle2JhY2tncm91bmQ6cmdiYSgxNTgsMTU4LDE1OCwuNCl9Omhvc3QobmcyLW1lbnUtaXRlbSkgL2RlZXAvIFtuZzItbWVudS1pdGVtLWljb25de3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtmb250LXNpemU6MjhweDt3aWR0aDoxLjVlbTtoZWlnaHQ6MzBweDtjb2xvcjpyZ2JhKDAsMCwwLC40NCl9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPSduZzItbWVudS1pdGVtJ1xuICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgW2NsYXNzLm5nMi1tZW51LWl0ZW0tLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWRcIlxuICAgICAoa2V5ZG93bi5lbnRlcik9XCJjbGljaygpXCJcbiAgICAgKGNsaWNrKT1cImNsaWNrKClcIlxuICAgICAobW91c2VvdmVyKT1cInNlbGVjdCgpXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBOZzJNZW51SXRlbSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQHByZXZlbnRDbG9zZVxuICAgICAqIEBkZXNjIGlmIHRydWUsIGNsaWNraW5nIG9uIHRoZSBpdGVtIHdvbid0IGNsb3NlIHRoZSBkcm9wZG93blxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwcmV2ZW50Q2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHZhbHVlXG4gICAgICogQGRlc2MgYW55IHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGl0ZW1cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGU6IERyb3Bkb3duU3RhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLm9uSXRlbURlc3Ryb3llZC5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGlzU2VsZWN0ZWRcbiAgICAgKiBAZGVzYyByZXR1cm5zIGN1cnJlbnQgc2VsZWN0ZWQgaXRlbVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgPT09IHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3RlZEl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgY2xpY2tcbiAgICAgKiBAZGVzYyBlbWl0cyBzZWxlY3QgZXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0KCRldmVudD8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdCh0aGlzLCB0cnVlKTtcblxuICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGNsaWNrXG4gICAgICogQGRlc2MgZW1pdHMgY2xpY2sgZXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS5vbkl0ZW1DbGlja2VkLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgZm9jdXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ2ZvY3VzJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcixcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgUXVlcnlMaXN0LFxuICAgIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIHRyaWdnZXIsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICBhbmltYXRlLFxuICAgIGtleWZyYW1lcyxcbiAgICBzdGF0ZVxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHsgQUNUSU9OUywgYXJyb3dLZXlzSGFuZGxlciB9IGZyb20gJy4vYWN0aW9ucyc7XG5cbmltcG9ydCB7IE5nMk1lbnVJdGVtIH0gZnJvbSAnLi4vbWVudS1pdGVtL25nMi1tZW51LWl0ZW0nO1xuaW1wb3J0IHsgRHJvcGRvd25TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kcm9wZG93bi1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZzItZHJvcGRvd24tbWVudScsXG4gICAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2t9Lm5nMi1kcm9wZG93bi1tZW51e292ZXJmbG93LXk6YXV0bztib3gtc2hhZG93OjAgMXB4IDJweCAwIHJnYmEoMCwwLDAsLjMpO3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6LjVlbSAwO2JhY2tncm91bmQ6I2ZmZjtib3JkZXItcmFkaXVzOjFweDttYXgtaGVpZ2h0OjQwMHB4O3dpZHRoOjI2MHB4O21pbi1oZWlnaHQ6MDtkaXNwbGF5OmJsb2NrfS5uZzItZHJvcGRvd24tbWVudS5uZzItZHJvcGRvd24tbWVudS0taW5zaWRlLWVsZW1lbnR7cG9zaXRpb246Zml4ZWR9Lm5nMi1kcm9wZG93bi1tZW51Lm5nMi1kcm9wZG93bi1tZW51LS13aWR0aC0tMnt3aWR0aDoyMDBweH0ubmcyLWRyb3Bkb3duLW1lbnUubmcyLWRyb3Bkb3duLW1lbnUtLXdpZHRoLS00e3dpZHRoOjI2MHB4fS5uZzItZHJvcGRvd24tbWVudS5uZzItZHJvcGRvd24tbWVudS0td2lkdGgtLTZ7d2lkdGg6MzIwcHh9Lm5nMi1kcm9wZG93bi1iYWNrZHJvcHtwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt6LWluZGV4OjE7b3ZlcmZsb3c6aGlkZGVufTpob3N0IC9kZWVwLyAubmcyLW1lbnUtZGl2aWRlcntoZWlnaHQ6MXB4O21pbi1oZWlnaHQ6MXB4O21heC1oZWlnaHQ6MXB4O3dpZHRoOjEwMCU7ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kOiNmOWY5Zjl9YF0sXG4gICAgdGVtcGxhdGU6IGA8IS0tIE1FTlUgLS0+XG48ZGl2IGNsYXNzPSduZzItZHJvcGRvd24tbWVudSBuZzItZHJvcGRvd24tbWVudS0tLXdpZHRoLS17eyB3aWR0aCB9fSdcbiAgICAgW2NsYXNzLm5nMi1kcm9wZG93bi1tZW51LS1pbnNpZGUtZWxlbWVudF09XCIhYXBwZW5kVG9Cb2R5XCJcbiAgICAgW2NsYXNzLm5nMi1kcm9wZG93bi1tZW51LS1vcGVuXT1cInN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGVcIlxuICAgICBbc3R5bGUuei1pbmRleF09XCJ6SW5kZXhcIlxuICAgICBbQGZhZGVdPVwic3RhdGUubWVudVN0YXRlLnRvU3RyaW5nKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nMi1kcm9wZG93bi1tZW51X19vcHRpb25zLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgW0BvcGFjaXR5XT1cInN0YXRlLm1lbnVTdGF0ZS50b1N0cmluZygpXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gQkFDS0RST1AgLS0+XG48ZGl2IGNsYXNzPVwibmcyLWRyb3Bkb3duLWJhY2tkcm9wXCIgKm5nSWY9XCJzdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlXCIgKGNsaWNrKT1cImhpZGUoKVwiPjwvZGl2PlxuYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2ZhZGUnLCBbXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKFxuICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAnYmxvY2snLCBvcGFjaXR5OiAxLCBoZWlnaHQ6ICcqJywgd2lkdGg6ICcqJ31cbiAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKFxuICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAnbm9uZScsIG9wYWNpdHk6IDAsIG92ZXJmbG93OiAnaGlkZGVuJywgaGVpZ2h0OiAwLCB3aWR0aDogMH1cbiAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMjUwbXMgZWFzZS1pbicsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCBoZWlnaHQ6ICcqJywgd2lkdGg6ICcqJ30pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCczNTBtcyBlYXNlLW91dCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJpZ2dlcignb3BhY2l0eScsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzQ1MG1zIGVhc2UtaW4nLCBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgb2Zmc2V0OiAwfSksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCBvZmZzZXQ6IDF9KSxcbiAgICAgICAgICAgICAgICBdKSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMjUwbXMgZWFzZS1vdXQnLCBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgb2Zmc2V0OiAwfSksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLjUsIG9mZnNldDogMC4zfSksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCBvZmZzZXQ6IDF9KSxcbiAgICAgICAgICAgICAgICBdKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJEcm9wZG93bk1lbnUge1xuICAgIC8qKlxuICAgICAqIEBuYW1lIHdpZHRoXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIHdpZHRoOiBudW1iZXIgPSA0O1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIGlmIHNldCB0byB0cnVlLCB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZHJvcGRvd24gd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGZvY3VzZWRcbiAgICAgKiBAbmFtZSBmb2N1c0ZpcnN0RWxlbWVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb2N1c0ZpcnN0RWxlbWVudDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gc2V0cyBkcm9wZG93biBvZmZzZXQgZnJvbSB0aGUgYnV0dG9uXG4gICAgICogQG5hbWUgb2Zmc2V0IHtzdHJpbmd9IGZvbGxvdyBmb3JtYXQgJzxudW1iZXI+IDxudW1iZXI+JyBleC4gJzAgMjAnXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIG9mZnNldDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgYXBwZW5kVG9Cb2R5XG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIGFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSB6SW5kZXhcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgekluZGV4ID0gMTAwMDtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGl0ZW1zXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihOZzJNZW51SXRlbSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBwdWJsaWMgaXRlbXM6IFF1ZXJ5TGlzdDxOZzJNZW51SXRlbT47XG5cbiAgICBwcml2YXRlIHBvc2l0aW9uOiBDbGllbnRSZWN0O1xuXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnM6IHsgYXJyb3dIYW5kbGVyPzogRnVuY3Rpb24sIGhhbmRsZUtleXByZXNzPzogRnVuY3Rpb24gfSA9IHtcbiAgICAgICAgYXJyb3dIYW5kbGVyOiB1bmRlZmluZWQsXG4gICAgICAgIGhhbmRsZUtleXByZXNzOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHN0YXRlOiBEcm9wZG93blN0YXRlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBzaG93XG4gICAgICogQHNob3dzIG1lbnUgYW5kIHNlbGVjdHMgZmlyc3QgaXRlbVxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KHBvc2l0aW9uPzogQ2xpZW50UmVjdCwgZHluYW1pYyA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHdkID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIC8vIHNldHRpbmcgaGFuZGxlcnNcbiAgICAgICAgICAgIGlmIChkYykge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzID0gdGhpcy5yZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAubGlzdGVuKGRjLmJvZHksICdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlwcmVzcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuYXJyb3dIYW5kbGVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4od2QsICdrZXlkb3duJywgYXJyb3dLZXlzSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICAgICAgdGhpcy5zdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24ocG9zaXRpb24sIGR5bmFtaWMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgaGlkZVxuICAgICAqIEBkZXNjIGhpZGVzIG1lbnVcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgaXRlbSBzdGF0ZVxuICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUudW5zZWxlY3QoKTtcblxuICAgICAgICAvLyBjYWxsIGZ1bmN0aW9uIHRvIHVubGlzdGVuXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5hcnJvd0hhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmFycm93SGFuZGxlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5oYW5kbGVLZXlwcmVzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgdXBkYXRlUG9zaXRpb25cbiAgICAgKiBAZGVzYyB1cGRhdGVzIHRoZSBtZW51IHBvc2l0aW9uIGV2ZXJ5IHRpbWUgaXQgaXMgdG9nZ2xlZFxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiB7Q2xpZW50UmVjdH1cbiAgICAgKiBAcGFyYW0gZHluYW1pYyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlUG9zaXRpb24ocG9zaXRpb246IENsaWVudFJlY3QsIGR5bmFtaWM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZU9uQ2hhbmdlKGR5bmFtaWMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGhhbmRsZUtleXByZXNzXG4gICAgICogQGRlc2MgZXhlY3V0ZXMgZnVuY3Rpb25zIG9uIGtleVByZXNzIGJhc2VkIG9uIHRoZSBrZXkgcHJlc3NlZFxuICAgICAqIEBwYXJhbSAkZXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlS2V5cHJlc3MoJGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGtleSA9ICRldmVudC5rZXlDb2RlO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW1zLmluZGV4T2YodGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdGVkSXRlbSEpO1xuXG4gICAgICAgIGlmICghQUNUSU9OUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBBQ1RJT05TW2tleV0uY2FsbCh0aGlzLCBpbmRleCwgaXRlbXMsIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgZ2V0TWVudUVsZW1lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE1lbnVFbGVtZW50KCk6IEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgY2FsY1Bvc2l0aW9uT2Zmc2V0XG4gICAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjUG9zaXRpb25PZmZzZXQocG9zaXRpb24pOiB7IHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcgfSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IHdkID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGRjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICghd2QgfHwgIWRjIHx8ICFwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0TWVudUVsZW1lbnQoKTtcbiAgICAgICAgY29uc3Qgc3VwcG9ydFBhZ2VPZmZzZXQgPSB3ZC5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBpc0NTUzFDb21wYXQgPSAoKGRjLmNvbXBhdE1vZGUgfHwgJycpID09PSAnQ1NTMUNvbXBhdCcpO1xuXG4gICAgICAgIGNvbnN0IHggPSBzdXBwb3J0UGFnZU9mZnNldCA/IHdkLnBhZ2VYT2Zmc2V0IDogaXNDU1MxQ29tcGF0ID9cbiAgICAgICAgICAgIGRjLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IDogZGMuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIGNvbnN0IHkgPSBzdXBwb3J0UGFnZU9mZnNldCA/IHdkLnBhZ2VZT2Zmc2V0IDogaXNDU1MxQ29tcGF0ID9cbiAgICAgICAgICAgIGRjLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgOiBkYy5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICBsZXQgeyB0b3AsIGxlZnQgfSA9IHRoaXMuYXBwbHlPZmZzZXQoXG4gICAgICAgICAgICBgJHtwb3NpdGlvbi50b3AgKyAodGhpcy5hcHBlbmRUb0JvZHkgPyB5IC0gMTUgOiAwKX1weGAsXG4gICAgICAgICAgICBgJHtwb3NpdGlvbi5sZWZ0ICsgeCAtIDV9cHhgXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgY2xpZW50V2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBjbGllbnRIZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgICAgICBjb25zdCBtYXJnaW5Gcm9tQm90dG9tID0gcGFyc2VJbnQodG9wKSArIGNsaWVudEhlaWdodCArICh0aGlzLmFwcGVuZFRvQm9keSA/IDAgOiB5IC0gMTUpO1xuICAgICAgICBjb25zdCBtYXJnaW5Gcm9tUmlnaHQgPSBwYXJzZUludChsZWZ0KSArIGNsaWVudFdpZHRoO1xuXG4gICAgICAgIGNvbnN0IHdpbmRvd1Njcm9sbEhlaWdodCA9IHdkLmlubmVySGVpZ2h0ICsgd2Quc2Nyb2xsWTtcbiAgICAgICAgY29uc3Qgd2luZG93U2Nyb2xsV2lkdGggPSB3ZC5pbm5lcldpZHRoICsgd2Quc2Nyb2xsWDtcblxuICAgICAgICBpZiAobWFyZ2luRnJvbUJvdHRvbSA+PSB3aW5kb3dTY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICAgIHRvcCA9IGAke3BhcnNlSW50KHRvcC5yZXBsYWNlKCdweCcsICcnKSkgLSBjbGllbnRIZWlnaHR9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hcmdpbkZyb21SaWdodCA+PSB3aW5kb3dTY3JvbGxXaWR0aCkge1xuICAgICAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBtYXJnaW5Gcm9tUmlnaHQgLSB3aW5kb3dTY3JvbGxXaWR0aCArIDMwO1xuICAgICAgICAgICAgbGVmdCA9IGAke3BhcnNlSW50KGxlZnQucmVwbGFjZSgncHgnLCAnJykpIC0gbWFyZ2luUmlnaHR9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgdG9wLCBsZWZ0IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseU9mZnNldCh0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nKTogeyB0b3A6IHN0cmluZywgbGVmdDogc3RyaW5nIH0ge1xuICAgICAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgaWYgKCFvZmZzZXRbMV0pIHtcbiAgICAgICAgICAgIG9mZnNldFsxXSA9ICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRvcCA9IGAke3BhcnNlSW50KHRvcC5yZXBsYWNlKCdweCcsICcnKSkgKyBwYXJzZUludChvZmZzZXRbMF0pfXB4YDtcbiAgICAgICAgbGVmdCA9IGAke3BhcnNlSW50KGxlZnQucmVwbGFjZSgncHgnLCAnJykpICsgcGFyc2VJbnQob2Zmc2V0WzFdKX1weGA7XG5cbiAgICAgICAgcmV0dXJuIHsgdG9wLCBsZWZ0IH07XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBkYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG9Cb2R5ICYmIGRjKSB7XG4gICAgICAgICAgICAvLyBhcHBlbmQgbWVudSBlbGVtZW50IHRvIHRoZSBib2R5XG4gICAgICAgICAgICBkYy5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVPbkNoYW5nZShkeW5hbWljID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRNZW51RWxlbWVudCgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2FsY1Bvc2l0aW9uT2Zmc2V0KHRoaXMucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZWxlbWVudCwgJ3RvcCcsIHBvc2l0aW9uLnRvcC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGVsZW1lbnQsICdsZWZ0JywgcG9zaXRpb24ubGVmdC50b1N0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlbGVjdCBmaXJzdCBpdGVtIHVubGVzcyB1c2VyIGRpc2FibGVkIHRoaXMgb3B0aW9uXG4gICAgICAgIGlmICh0aGlzLmZvY3VzRmlyc3RFbGVtZW50ICYmXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmZpcnN0ICYmXG4gICAgICAgICAgICAhdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdCh0aGlzLml0ZW1zLmZpcnN0LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5oYW5kbGVLZXlwcmVzcykge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgSG9zdExpc3RlbmVyLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmcyRHJvcGRvd25CdXR0b24gfSBmcm9tICcuLi9idXR0b24vbmcyLWRyb3Bkb3duLWJ1dHRvbic7XG5pbXBvcnQgeyBOZzJEcm9wZG93bk1lbnUgfSBmcm9tICcuLi9tZW51L25nMi1kcm9wZG93bi1tZW51JztcbmltcG9ydCB7IERyb3Bkb3duU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZHJvcGRvd24tc3RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBOZzJNZW51SXRlbSB9IGZyb20gJy4uL21lbnUtaXRlbS9uZzItbWVudS1pdGVtJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZzItZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nMi1kcm9wZG93bi1jb250YWluZXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZzItZHJvcGRvd24tYnV0dG9uXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5nMi1kcm9wZG93bi1tZW51XCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICAgIHByb3ZpZGVyczogWyBEcm9wZG93blN0YXRlU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIE5nMkRyb3Bkb3duIHtcbiAgICAvLyBnZXQgY2hpbGRyZW4gY29tcG9uZW50c1xuICAgIEBDb250ZW50Q2hpbGQoTmcyRHJvcGRvd25CdXR0b24pIHB1YmxpYyBidXR0b246IE5nMkRyb3Bkb3duQnV0dG9uO1xuICAgIEBDb250ZW50Q2hpbGQoTmcyRHJvcGRvd25NZW51KSBwdWJsaWMgbWVudTogTmcyRHJvcGRvd25NZW51O1xuXG4gICAgQElucHV0KCkgcHVibGljIGR5bmFtaWNVcGRhdGUgPSB0cnVlO1xuXG4gICAgLy8gb3V0cHV0c1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25JdGVtQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSXRlbVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25TaG93OiBFdmVudEVtaXR0ZXI8TmcyRHJvcGRvd24+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZzJEcm9wZG93bj4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSGlkZTogRXZlbnRFbWl0dGVyPE5nMkRyb3Bkb3duPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmcyRHJvcGRvd24+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlOiBEcm9wZG93blN0YXRlU2VydmljZSkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLm9uSXRlbUNsaWNrZWQuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkl0ZW1DbGlja2VkLmVtaXQoaXRlbSk7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLnByZXZlbnRDbG9zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oaWRlLmNhbGwodGhpcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5idXR0b24ub25NZW51VG9nZ2xlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTWVudSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUub25JdGVtU2VsZWN0ZWQuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUub25JdGVtRGVzdHJveWVkLnN1YnNjcmliZSgoaXRlbTogTmcyTWVudUl0ZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdTZWxlY3RlZEl0ZW06IE5nMk1lbnVJdGVtIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLm1lbnUuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWVudS5mb2N1c0ZpcnN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGVkSXRlbSA9IGl0ZW0gPT09IGl0ZW1zWzBdICYmIGl0ZW1zLmxlbmd0aCA+IDEgPyBpdGVtc1sxXSA6IGl0ZW1zWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0KG5ld1NlbGVjdGVkSXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHRvZ2dsZU1lbnVcbiAgICAgKiBAZGVzYyB0b2dnbGVzIG1lbnUgdmlzaWJpbGl0eVxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVNZW51KHBvc2l0aW9uID0gdGhpcy5idXR0b24uZ2V0UG9zaXRpb24oKSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGUgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhwb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogLSBoaWRlcyBkcm9wZG93blxuICAgICAqIEBuYW1lIGhpZGVcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZW51LmhpZGUoKTtcbiAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtIHNob3dzIGRyb3Bkb3duXG4gICAgICogQG5hbWUgc2hvd1xuICAgICAqIEBwYXJhbSBwb3NpdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KHBvc2l0aW9uID0gdGhpcy5idXR0b24uZ2V0UG9zaXRpb24oKSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lbnUuc2hvdyhwb3NpdGlvbiwgdGhpcy5keW5hbWljVXBkYXRlKTtcbiAgICAgICAgdGhpcy5vblNob3cuZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBzY3JvbGxMaXN0ZW5lclxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnKVxuICAgIHB1YmxpYyBzY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uICYmIHRoaXMuZHluYW1pY1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5tZW51LnVwZGF0ZVBvc2l0aW9uKHRoaXMuYnV0dG9uLmdldFBvc2l0aW9uKCksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmcyRHJvcGRvd24gfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24vbmcyLWRyb3Bkb3duJztcbmltcG9ydCB7IE5nMkRyb3Bkb3duTWVudSB9IGZyb20gJy4vY29tcG9uZW50cy9tZW51L25nMi1kcm9wZG93bi1tZW51JztcbmltcG9ydCB7IE5nMkRyb3Bkb3duQnV0dG9uIH0gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9uZzItZHJvcGRvd24tYnV0dG9uJztcbmltcG9ydCB7IE5nMk1lbnVJdGVtIH0gZnJvbSAnLi9jb21wb25lbnRzL21lbnUtaXRlbS9uZzItbWVudS1pdGVtJztcblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEcm9wZG93blN0YXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZHJvcGRvd24tc3RhdGUuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW1xuICAgICAgICBOZzJNZW51SXRlbSxcbiAgICAgICAgTmcyRHJvcGRvd25CdXR0b24sXG4gICAgICAgIE5nMkRyb3Bkb3duTWVudSxcbiAgICAgICAgTmcyRHJvcGRvd25cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBOZzJEcm9wZG93bixcbiAgICAgICAgTmcyTWVudUl0ZW0sXG4gICAgICAgIE5nMkRyb3Bkb3duQnV0dG9uLFxuICAgICAgICBOZzJEcm9wZG93bk1lbnUsXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmcyRHJvcGRvd25Nb2R1bGUge31cblxuZXhwb3J0IHtcbiAgICBOZzJEcm9wZG93bixcbiAgICBOZzJEcm9wZG93bk1lbnUsXG4gICAgTmcyTWVudUl0ZW0sXG4gICAgTmcyRHJvcGRvd25CdXR0b24sXG4gICAgRHJvcGRvd25TdGF0ZVNlcnZpY2Vcbn1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiT3V0cHV0IiwiSW5wdXQiLCJJbmplY3RhYmxlIiwiUmVuZGVyZXIiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJhbmltYXRlIiwia2V5ZnJhbWVzIiwiQ29udGVudENoaWxkcmVuIiwiQ29udGVudENoaWxkIiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQTBCSSwyQkFBb0IsT0FBbUI7WUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtpQ0FIaUIsSUFBSUEsaUJBQVksRUFBVzs2QkFDOUMsSUFBSTtTQUVFOzs7Ozs7UUFNcEMsc0NBQVU7Ozs7OztnQkFDYixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztRQU8zQix1Q0FBVzs7Ozs7O2dCQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7OztvQkFqQy9EQyxjQUFTLFNBQUM7d0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjt3QkFDL0IsTUFBTSxFQUFFLENBQUMsczJCQUFvMkIsQ0FBQzt3QkFDOTJCLFFBQVEsRUFBRSx5MkJBU2I7cUJBQ0E7Ozs7O3dCQWhCR0MsZUFBVTs7OztzQ0FrQlRDLFdBQU07a0NBQ05DLFVBQUs7O2dDQXhCVjs7Ozs7OztJQ0lBLHFCQUFNLElBQUksR0FBRztRQUNULFNBQVMsRUFBRSxDQUFDO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFB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