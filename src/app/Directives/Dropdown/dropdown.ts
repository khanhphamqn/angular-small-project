import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[dropdown]'
 })

 export class Dropdown{
  @HostBinding('class.is-open') isOpen = false;
  @HostListener('document:click') clickout() {
    this.isOpen = false;
  }
  @HostListener('click', ['$event']) toggleOpen($event){
    $event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
 }