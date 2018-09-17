/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Renderer, ContentChildren, QueryList, Input } from '@angular/core';
import { trigger, style, transition, animate, keyframes, state } from '@angular/animations';
import { ACTIONS, arrowKeysHandler } from './actions';
import { Ng2MenuItem } from '../menu-item/ng2-menu-item';
import { DropdownStateService } from '../../services/dropdown-state.service';
var Ng2DropdownMenu = /** @class */ (function () {
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
        if (dynamic === void 0) { dynamic = true; }
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
        if (dynamic === void 0) { dynamic = true; }
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
        { type: Component, args: [{
                    selector: 'ng2-dropdown-menu',
                    styles: [":host{display:block}.ng2-dropdown-menu{overflow-y:auto;box-shadow:0 1px 2px 0 rgba(0,0,0,.3);position:absolute;padding:.5em 0;background:#fff;border-radius:1px;max-height:400px;width:260px;min-height:0;display:block}.ng2-dropdown-menu.ng2-dropdown-menu--inside-element{position:fixed}.ng2-dropdown-menu.ng2-dropdown-menu--width--2{width:200px}.ng2-dropdown-menu.ng2-dropdown-menu--width--4{width:260px}.ng2-dropdown-menu.ng2-dropdown-menu--width--6{width:320px}.ng2-dropdown-backdrop{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:hidden}:host /deep/ .ng2-menu-divider{height:1px;min-height:1px;max-height:1px;width:100%;display:block;background:#f9f9f9}"],
                    template: "<!-- MENU -->\n<div class='ng2-dropdown-menu ng2-dropdown-menu---width--{{ width }}'\n     [class.ng2-dropdown-menu--inside-element]=\"!appendToBody\"\n     [class.ng2-dropdown-menu--open]=\"state.menuState.isVisible\"\n     [style.z-index]=\"zIndex\"\n     [@fade]=\"state.menuState.toString()\">\n        <div class=\"ng2-dropdown-menu__options-container\"\n             [@opacity]=\"state.menuState.toString()\">\n            <ng-content></ng-content>\n        </div>\n</div>\n\n<!-- BACKDROP -->\n<div class=\"ng2-dropdown-backdrop\" *ngIf=\"state.menuState.isVisible\" (click)=\"hide()\"></div>\n",
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
    Ng2DropdownMenu.ctorParameters = function () { return [
        { type: DropdownStateService, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    Ng2DropdownMenu.propDecorators = {
        "width": [{ type: Input },],
        "focusFirstElement": [{ type: Input },],
        "offset": [{ type: Input },],
        "appendToBody": [{ type: Input },],
        "zIndex": [{ type: Input },],
        "items": [{ type: ContentChildren, args: [Ng2MenuItem, { descendants: true },] },],
    };
    return Ng2DropdownMenu;
}());
export { Ng2DropdownMenu };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWRyb3Bkb3duLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItbWF0ZXJpYWwtZHJvcGRvd24vIiwic291cmNlcyI6WyJzcmMvbW9kdWxlcy9jb21wb25lbnRzL21lbnUvbmcyLWRyb3Bkb3duLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsRUFDUixlQUFlLEVBQ2YsU0FBUyxFQUNULEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFNBQVMsRUFDVCxLQUFLLEVBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7SUFnR3pFLHlCQUFtQixLQUEyQixFQUMxQixTQUNBO1FBRkQsVUFBSyxHQUFMLEtBQUssQ0FBc0I7UUFDMUIsWUFBTyxHQUFQLE9BQU87UUFDUCxhQUFRLEdBQVIsUUFBUTs7OztxQkF0Q0ksQ0FBQzs7Ozs7aUNBTVksSUFBSTs7Ozs0QkFXVCxJQUFJOzs7O3NCQUtuQixJQUFJO3lCQVMrQztZQUN4RSxZQUFZLEVBQUUsU0FBUztZQUN2QixjQUFjLEVBQUUsU0FBUztTQUM1QjtLQUl5Qzs7Ozs7Ozs7SUFNbkMsOEJBQUk7Ozs7Ozs7Y0FBQyxRQUFxQixFQUFFLE9BQWM7UUFBZCx3QkFBQSxFQUFBLGNBQWM7UUFDN0MscUJBQU0sRUFBRSxHQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbEUscUJBQU0sRUFBRSxHQUFHLE9BQU8s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LG9CQUFvQjtnQkFuQnpCLFVBQVU7Z0JBQ1YsUUFBUTs7OzBCQThFUCxLQUFLO3NDQU1MLEtBQUs7MkJBTUwsS0FBSztpQ0FLTCxLQUFLOzJCQUtMLEtBQUs7MEJBS0wsZUFBZSxTQUFDLFdBQVcsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7OzBCQTVHdkQ7O1NBNkVhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIFJlbmRlcmVyLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgdHJpZ2dlcixcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIGFuaW1hdGUsXG4gICAga2V5ZnJhbWVzLFxuICAgIHN0YXRlXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBBQ1RJT05TLCBhcnJvd0tleXNIYW5kbGVyIH0gZnJvbSAnLi9hY3Rpb25zJztcblxuaW1wb3J0IHsgTmcyTWVudUl0ZW0gfSBmcm9tICcuLi9tZW51LWl0ZW0vbmcyLW1lbnUtaXRlbSc7XG5pbXBvcnQgeyBEcm9wZG93blN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Ryb3Bkb3duLXN0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nMi1kcm9wZG93bi1tZW51JyxcbiAgICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9ja30ubmcyLWRyb3Bkb3duLW1lbnV7b3ZlcmZsb3cteTphdXRvO2JveC1zaGFkb3c6MCAxcHggMnB4IDAgcmdiYSgwLDAsMCwuMyk7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZzouNWVtIDA7YmFja2dyb3VuZDojZmZmO2JvcmRlci1yYWRpdXM6MXB4O21heC1oZWlnaHQ6NDAwcHg7d2lkdGg6MjYwcHg7bWluLWhlaWdodDowO2Rpc3BsYXk6YmxvY2t9Lm5nMi1kcm9wZG93bi1tZW51Lm5nMi1kcm9wZG93bi1tZW51LS1pbnNpZGUtZWxlbWVudHtwb3NpdGlvbjpmaXhlZH0ubmcyLWRyb3Bkb3duLW1lbnUubmcyLWRyb3Bkb3duLW1lbnUtLXdpZHRoLS0ye3dpZHRoOjIwMHB4fS5uZzItZHJvcGRvd24tbWVudS5uZzItZHJvcGRvd24tbWVudS0td2lkdGgtLTR7d2lkdGg6MjYwcHh9Lm5nMi1kcm9wZG93bi1tZW51Lm5nMi1kcm9wZG93bi1tZW51LS13aWR0aC0tNnt3aWR0aDozMjBweH0ubmcyLWRyb3Bkb3duLWJhY2tkcm9we3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MTtvdmVyZmxvdzpoaWRkZW59Omhvc3QgL2RlZXAvIC5uZzItbWVudS1kaXZpZGVye2hlaWdodDoxcHg7bWluLWhlaWdodDoxcHg7bWF4LWhlaWdodDoxcHg7d2lkdGg6MTAwJTtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQ6I2Y5ZjlmOX1gXSxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gTUVOVSAtLT5cbjxkaXYgY2xhc3M9J25nMi1kcm9wZG93bi1tZW51IG5nMi1kcm9wZG93bi1tZW51LS0td2lkdGgtLXt7IHdpZHRoIH19J1xuICAgICBbY2xhc3MubmcyLWRyb3Bkb3duLW1lbnUtLWluc2lkZS1lbGVtZW50XT1cIiFhcHBlbmRUb0JvZHlcIlxuICAgICBbY2xhc3MubmcyLWRyb3Bkb3duLW1lbnUtLW9wZW5dPVwic3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZVwiXG4gICAgIFtzdHlsZS56LWluZGV4XT1cInpJbmRleFwiXG4gICAgIFtAZmFkZV09XCJzdGF0ZS5tZW51U3RhdGUudG9TdHJpbmcoKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmcyLWRyb3Bkb3duLW1lbnVfX29wdGlvbnMtY29udGFpbmVyXCJcbiAgICAgICAgICAgICBbQG9wYWNpdHldPVwic3RhdGUubWVudVN0YXRlLnRvU3RyaW5nKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBCQUNLRFJPUCAtLT5cbjxkaXYgY2xhc3M9XCJuZzItZHJvcGRvd24tYmFja2Ryb3BcIiAqbmdJZj1cInN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGVcIiAoY2xpY2spPVwiaGlkZSgpXCI+PC9kaXY+XG5gLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoXG4gICAgICAgICAgICAgICAge2Rpc3BsYXk6ICdibG9jaycsIG9wYWNpdHk6IDEsIGhlaWdodDogJyonLCB3aWR0aDogJyonfVxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoXG4gICAgICAgICAgICAgICAge2Rpc3BsYXk6ICdub25lJywgb3BhY2l0eTogMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCBoZWlnaHQ6IDAsIHdpZHRoOiAwfVxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcyNTBtcyBlYXNlLWluJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIGhlaWdodDogJyonLCB3aWR0aDogJyonfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzM1MG1zIGVhc2Utb3V0JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pLFxuICAgICAgICB0cmlnZ2VyKCdvcGFjaXR5JywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnNDUwbXMgZWFzZS1pbicsIGtleWZyYW1lcyhbXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCBvZmZzZXQ6IDB9KSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIG9mZnNldDogMX0pLFxuICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcyNTBtcyBlYXNlLW91dCcsIGtleWZyYW1lcyhbXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCBvZmZzZXQ6IDB9KSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAuNSwgb2Zmc2V0OiAwLjN9KSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIG9mZnNldDogMX0pLFxuICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nMkRyb3Bkb3duTWVudSB7XG4gICAgLyoqXG4gICAgICogQG5hbWUgd2lkdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDQ7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gaWYgc2V0IHRvIHRydWUsIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBkcm9wZG93biB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZm9jdXNlZFxuICAgICAqIEBuYW1lIGZvY3VzRmlyc3RFbGVtZW50XG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIGZvY3VzRmlyc3RFbGVtZW50OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBzZXRzIGRyb3Bkb3duIG9mZnNldCBmcm9tIHRoZSBidXR0b25cbiAgICAgKiBAbmFtZSBvZmZzZXQge3N0cmluZ30gZm9sbG93IGZvcm1hdCAnPG51bWJlcj4gPG51bWJlcj4nIGV4LiAnMCAyMCdcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgb2Zmc2V0OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBhcHBlbmRUb0JvZHlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHpJbmRleFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB6SW5kZXggPSAxMDAwO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgaXRlbXNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE5nMk1lbnVJdGVtLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIHB1YmxpYyBpdGVtczogUXVlcnlMaXN0PE5nMk1lbnVJdGVtPjtcblxuICAgIHByaXZhdGUgcG9zaXRpb246IENsaWVudFJlY3Q7XG5cbiAgICBwcml2YXRlIGxpc3RlbmVyczogeyBhcnJvd0hhbmRsZXI/OiBGdW5jdGlvbiwgaGFuZGxlS2V5cHJlc3M/OiBGdW5jdGlvbiB9ID0ge1xuICAgICAgICBhcnJvd0hhbmRsZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgaGFuZGxlS2V5cHJlc3M6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGU6IERyb3Bkb3duU3RhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHNob3dcbiAgICAgKiBAc2hvd3MgbWVudSBhbmQgc2VsZWN0cyBmaXJzdCBpdGVtXG4gICAgICovXG4gICAgcHVibGljIHNob3cocG9zaXRpb24/OiBDbGllbnRSZWN0LCBkeW5hbWljID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgd2QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gc2V0dGluZyBoYW5kbGVyc1xuICAgICAgICAgICAgaWYgKGRjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MgPSB0aGlzLnJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgIC5saXN0ZW4oZGMuYm9keSwgJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleXByZXNzLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5hcnJvd0hhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih3ZCwgJ2tleWRvd24nLCBhcnJvd0tleXNIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgICAgICB0aGlzLnN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbihwb3NpdGlvbiwgZHluYW1pYyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBoaWRlXG4gICAgICogQGRlc2MgaGlkZXMgbWVudVxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvLyByZXNldCBzZWxlY3RlZCBpdGVtIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGUuZHJvcGRvd25TdGF0ZS51bnNlbGVjdCgpO1xuXG4gICAgICAgIC8vIGNhbGwgZnVuY3Rpb24gdG8gdW5saXN0ZW5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLmFycm93SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuYXJyb3dIYW5kbGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnMuaGFuZGxlS2V5cHJlc3MpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSB1cGRhdGVQb3NpdGlvblxuICAgICAqIEBkZXNjIHVwZGF0ZXMgdGhlIG1lbnUgcG9zaXRpb24gZXZlcnkgdGltZSBpdCBpcyB0b2dnbGVkXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIHtDbGllbnRSZWN0fVxuICAgICAqIEBwYXJhbSBkeW5hbWljIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbihwb3NpdGlvbjogQ2xpZW50UmVjdCwgZHluYW1pYzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMudXBkYXRlT25DaGFuZ2UoZHluYW1pYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgaGFuZGxlS2V5cHJlc3NcbiAgICAgKiBAZGVzYyBleGVjdXRlcyBmdW5jdGlvbnMgb24ga2V5UHJlc3MgYmFzZWQgb24gdGhlIGtleSBwcmVzc2VkXG4gICAgICogQHBhcmFtICRldmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVLZXlwcmVzcygkZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qga2V5ID0gJGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuaW5kZXhPZih0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0ZWRJdGVtISk7XG5cbiAgICAgICAgaWYgKCFBQ1RJT05TLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFDVElPTlNba2V5XS5jYWxsKHRoaXMsIGluZGV4LCBpdGVtcywgdGhpcy5zdGF0ZS5kcm9wZG93blN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBnZXRNZW51RWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0TWVudUVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBjYWxjUG9zaXRpb25PZmZzZXRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNQb3NpdGlvbk9mZnNldChwb3NpdGlvbik6IHsgdG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZyB9IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3Qgd2QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZGMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCF3ZCB8fCAhZGMgfHwgIXBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRNZW51RWxlbWVudCgpO1xuICAgICAgICBjb25zdCBzdXBwb3J0UGFnZU9mZnNldCA9IHdkLnBhZ2VYT2Zmc2V0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGlzQ1NTMUNvbXBhdCA9ICgoZGMuY29tcGF0TW9kZSB8fCAnJykgPT09ICdDU1MxQ29tcGF0Jyk7XG5cbiAgICAgICAgY29uc3QgeCA9IHN1cHBvcnRQYWdlT2Zmc2V0ID8gd2QucGFnZVhPZmZzZXQgOiBpc0NTUzFDb21wYXQgP1xuICAgICAgICAgICAgZGMuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgOiBkYy5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgY29uc3QgeSA9IHN1cHBvcnRQYWdlT2Zmc2V0ID8gd2QucGFnZVlPZmZzZXQgOiBpc0NTUzFDb21wYXQgP1xuICAgICAgICAgICAgZGMuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IGRjLmJvZHkuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGxldCB7IHRvcCwgbGVmdCB9ID0gdGhpcy5hcHBseU9mZnNldChcbiAgICAgICAgICAgIGAke3Bvc2l0aW9uLnRvcCArICh0aGlzLmFwcGVuZFRvQm9keSA/IHkgLSAxNSA6IDApfXB4YCxcbiAgICAgICAgICAgIGAke3Bvc2l0aW9uLmxlZnQgKyB4IC0gNX1weGBcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjbGllbnRXaWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IG1hcmdpbkZyb21Cb3R0b20gPSBwYXJzZUludCh0b3ApICsgY2xpZW50SGVpZ2h0ICsgKHRoaXMuYXBwZW5kVG9Cb2R5ID8gMCA6IHkgLSAxNSk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkZyb21SaWdodCA9IHBhcnNlSW50KGxlZnQpICsgY2xpZW50V2lkdGg7XG5cbiAgICAgICAgY29uc3Qgd2luZG93U2Nyb2xsSGVpZ2h0ID0gd2QuaW5uZXJIZWlnaHQgKyB3ZC5zY3JvbGxZO1xuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxXaWR0aCA9IHdkLmlubmVyV2lkdGggKyB3ZC5zY3JvbGxYO1xuXG4gICAgICAgIGlmIChtYXJnaW5Gcm9tQm90dG9tID49IHdpbmRvd1Njcm9sbEhlaWdodCkge1xuICAgICAgICAgICAgdG9wID0gYCR7cGFyc2VJbnQodG9wLnJlcGxhY2UoJ3B4JywgJycpKSAtIGNsaWVudEhlaWdodH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWFyZ2luRnJvbVJpZ2h0ID49IHdpbmRvd1Njcm9sbFdpZHRoKSB7XG4gICAgICAgICAgICBjb25zdCBtYXJnaW5SaWdodCA9IG1hcmdpbkZyb21SaWdodCAtIHdpbmRvd1Njcm9sbFdpZHRoICsgMzA7XG4gICAgICAgICAgICBsZWZ0ID0gYCR7cGFyc2VJbnQobGVmdC5yZXBsYWNlKCdweCcsICcnKSkgLSBtYXJnaW5SaWdodH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5T2Zmc2V0KHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcpOiB7IHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcgfSB7XG4gICAgICAgIGlmICghdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHRvcCwgbGVmdCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQuc3BsaXQoJyAnKTtcblxuICAgICAgICBpZiAoIW9mZnNldFsxXSkge1xuICAgICAgICAgICAgb2Zmc2V0WzFdID0gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wID0gYCR7cGFyc2VJbnQodG9wLnJlcGxhY2UoJ3B4JywgJycpKSArIHBhcnNlSW50KG9mZnNldFswXSl9cHhgO1xuICAgICAgICBsZWZ0ID0gYCR7cGFyc2VJbnQobGVmdC5yZXBsYWNlKCdweCcsICcnKSkgKyBwYXJzZUludChvZmZzZXRbMV0pfXB4YDtcblxuICAgICAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkgJiYgZGMpIHtcbiAgICAgICAgICAgIC8vIGFwcGVuZCBtZW51IGVsZW1lbnQgdG8gdGhlIGJvZHlcbiAgICAgICAgICAgIGRjLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU9uQ2hhbmdlKGR5bmFtaWMgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldE1lbnVFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYWxjUG9zaXRpb25PZmZzZXQodGhpcy5wb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShlbGVtZW50LCAndG9wJywgcG9zaXRpb24udG9wLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZWxlbWVudCwgJ2xlZnQnLCBwb3NpdGlvbi5sZWZ0LnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VsZWN0IGZpcnN0IGl0ZW0gdW5sZXNzIHVzZXIgZGlzYWJsZWQgdGhpcyBvcHRpb25cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNGaXJzdEVsZW1lbnQgJiZcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZmlyc3QgJiZcbiAgICAgICAgICAgICF0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0KHRoaXMuaXRlbXMuZmlyc3QsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLmhhbmRsZUtleXByZXNzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5oYW5kbGVLZXlwcmVzcygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19