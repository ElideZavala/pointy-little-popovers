import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
import { AppUserCard } from 'src/interfaces/app-user-card.interface';
import { TheAmazingListItemComponent } from '../the-amazing-list-item/the-amazing-list-item.component';

@Component({
  selector: 'app-the-amazing-list',
  templateUrl: './the-amazing-list.component.html',
  styleUrls: ['./the-amazing-list.component.scss'],
  host: {
    role: 'list',
  },
})
export class TheAmazingListComponent implements OnInit, AfterViewInit {
  @Input() listItems: Partial<AppUserCard>[] = []; // es un array de objetos que tienen que tener al menos las propiedades de AppUserCard
  @ViewChildren(TheAmazingListItemComponent)
  listItemsElements: QueryList<TheAmazingListItemComponent>; // QueryList es un array de elementos que se pueden actualizar dinamicamente
  popoverMenuTrigger: CdkOverlayOrigin;
  menuShown = false;
  menuPositions = [
    {
      offsetY: 4,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      offsetY: -4,
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
  ];
  menuPopoverOrigin = {
    originY: null,
  };
  private listKeyManager: FocusKeyManager<TheAmazingListItemComponent>;

  @HostListener('window:keydown', ['$event'])
  onKeydown(event) {
    this.listKeyManager.onKeydown(event);
  }
  constructor(private cdRef: ChangeDetectorRef) {}

  popoverPositionChanged($event, popover) {
    if (popover.originY !== $event.connectionPair.originY) {
      this.menuPopoverOrigin.originY = $event.connectionPair.originY;
    }
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

  openMenu($event, itemTrigger) {
    if ($event) {
      $event.stopImmediatePropagation();
    }
    this.popoverMenuTrigger = itemTrigger;
    this.menuShown = true;
  }

  ngAfterViewInit() {
    this.listKeyManager = new FocusKeyManager(this.listItemsElements);
  }

  dupicate() {
    console.log('soy un dupicado');
  }
}
