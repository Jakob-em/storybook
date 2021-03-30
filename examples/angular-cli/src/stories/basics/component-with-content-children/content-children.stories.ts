import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Output,
  QueryList,
} from '@angular/core';

import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

@Directive({
  selector: '[storybook-child]',
})
class ChildDirective implements AfterContentInit {
  @ContentChildren(ChildDirective)
  children: QueryList<ChildDirective>;

  ngAfterContentInit(): void {
    this.children.changes.subscribe((c) => console.log(c.toArray()));
    console.log('children:', this.children.toArray());
  }
}

@Component({
  selector: 'storybook-with-content-children',
  template: ` <div></div>`,
})
class ComponentWithContentChildren implements AfterContentInit {
  @ContentChildren(ChildDirective)
  children: QueryList<ChildDirective>;

  ngAfterContentInit(): void {
    console.log('parent:', this.children.toArray());
  }
}

export default {
  title: 'Basics / Component / With ContentChildren',
  component: ComponentWithContentChildren,
  decorators: [moduleMetadata({ declarations: [ChildDirective] })],
} as Meta;

export const Default: Story = () => ({
  template: `<storybook-with-content-children>
    <span storybook-child>child</span>
</storybook-with-content-children>`,
});
