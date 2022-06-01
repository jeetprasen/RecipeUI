import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    
    
    // Using click
    
    @HostBinding('class.open') isOpen = false;
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    /* // Using mouse hover

    @HostBinding('class.open') isOpen = false;

    @HostListener('mouseenter')
    onMouseEnter() {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.isOpen = false;
    } */
}