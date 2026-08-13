
import { NgModule, inject } from '@angular/core';
import { ServoyBootstrapExtraBreadcrumbs } from './breadcrumbs/breadcrumbs';
import { ServoyBootstrapExtraButtonsGroup } from './buttonsgroup/buttonsgroup';
import { ServoyBootstrapExtraBadge } from './badge/badge';
import { ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup, AddOn, AddOnButton } from './inputgroup/inputgroup';
import { ServoyBootstrapExtraRating } from './rating/rating';
import { ServoyBootstrapExtraProgressBar } from './progressbar/progressbar';
import {ServoyBootstrapExtraDropdown, MenuItem as dropdown_MenuItem} from './dropdown/dropdown';
import { ServoyBootstrapExtraCarousel, Slide } from './carousel/carousel';
import { MenuItem, ServoyBootstrapExtraNavbar, SvyAttributes } from './navbar/navbar';
import { ServoyPublicModule, SpecTypesService } from '@servoy/public';
import { ServoyBootstrapExtraSwitch } from './switch/switch';

@NgModule({
    declarations: [],
    providers: [],
    imports: [
      ServoyPublicModule,
      ServoyBootstrapExtraBreadcrumbs,
      ServoyBootstrapExtraNavbar,
      ServoyBootstrapExtraCarousel,
      ServoyBootstrapExtraBadge,
      ServoyBootstrapExtraButtonsGroup,
      ServoyBootstrapExtraInputGroup,
      SvyAttributesInputGroup,
      ServoyBootstrapExtraRating,
      ServoyBootstrapExtraProgressBar,
      ServoyBootstrapExtraDropdown,
      ServoyBootstrapExtraSwitch,
      SvyAttributes
    ],
    exports: [
        ServoyBootstrapExtraBreadcrumbs,
        ServoyBootstrapExtraNavbar,
        ServoyBootstrapExtraCarousel,
        ServoyBootstrapExtraBadge,
        ServoyBootstrapExtraButtonsGroup,
        ServoyBootstrapExtraInputGroup,
        SvyAttributesInputGroup,
        ServoyBootstrapExtraRating,
        ServoyBootstrapExtraProgressBar,
        ServoyBootstrapExtraDropdown,
        ServoyBootstrapExtraSwitch,
        SvyAttributes
      ]
})
export class ServoyBootstrapExtraComponentsModule {
      private readonly specTypesService = inject(SpecTypesService);

      constructor() {
         this.specTypesService.registerType('bootstrapextracomponents-navbar.menuItem', MenuItem);
         this.specTypesService.registerType('bootstrapextracomponents-dropdown.MenuItem', dropdown_MenuItem);
         this.specTypesService.registerType('bootstrapextracomponents-carousel.slide', Slide);
         this.specTypesService.registerType('bootstrapextracomponents-input-group.addOn', AddOn);
         this.specTypesService.registerType('bootstrapextracomponents-input-group.addOnButton', AddOnButton);
      }
}
