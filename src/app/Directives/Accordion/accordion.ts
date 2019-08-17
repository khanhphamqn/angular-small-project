import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: '[accordion]'
 })

 export class Accordion{
  private element: HTMLInputElement;
  
  @HostBinding('class.is-open') isOpen = false;
  @HostListener('click', ['$event']) toggleOpen($event){
    $event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    if(this.element.classList.contains('is-open')){
      this.isOpen = true;
    }
  }
 }