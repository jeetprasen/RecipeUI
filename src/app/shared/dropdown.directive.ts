import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    
    
    // Using click
    
    @HostBinding('class.open') isOpen = false;
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
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

    constructor(private elRef: ElementRef) {}
}