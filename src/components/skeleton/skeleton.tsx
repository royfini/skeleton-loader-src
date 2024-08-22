import { Component, Element, h } from '@stencil/core/internal';
import tailwind from '../../output.css';

@Component({
  tag: 'rf-skeleton',
  styleUrl: './skeleton.css',
  shadow: true,
})
export class Skeleton {
  @Element() element: HTMLElement;

  componentDidLoad() {
    const shadowRoot = this.element.shadowRoot;
    if (shadowRoot) {
      const style = document.createElement('style');
      style.textContent = tailwind;
      shadowRoot.appendChild(style);
    }
  }

  render() {
    return (
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(15)].map(_ => {
          return (
            <div class="rounded-md border-2 border-gray-700 bg-gray-300 w-60 h-65 mx-auto my-5 p-5">
              <img class="w-60 h-36 skeleton"></img>
              <div class="mt-5 h-30">
                <p class="font-bold text-xl font-mono skeleton w-40 h-6 mb-2"></p>
                <p class="font-semibold skeleton w-24 h-4"></p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
