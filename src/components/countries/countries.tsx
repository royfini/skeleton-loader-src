import { Component, Element, h, State } from '@stencil/core/internal';
import tailwind from '../../output.css';

interface country {
  name: string;
  img: string;
  capital: string;
}

@Component({
  tag: 'rf-countries',
  styleUrl: './countries.css',
  shadow: true,
})
export class Countries {
  @Element() element: HTMLElement;

  componentDidLoad() {
    const shadowRoot = this.element.shadowRoot;
    if (shadowRoot) {
      const style = document.createElement('style');
      style.textContent = tailwind;
      shadowRoot.appendChild(style);
    }

    this.getData();
  }

  componentWillLoad() {
    //this.getData();
  }

  @State() data: country[] = [];

  @State() loading = true;
  getData() {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(json => {
        const array = json;
        this.data = array.map(e => ({
          name: e.name.common,
          img: e.flags.png,
          capital: e.capital,
        }));
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
      
  }

  render() {
    console.log(this.loading)
    return (
      <div>
        {this.loading ? (
          <rf-skeleton></rf-skeleton>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
            {this.data.map(c => {
              return (
                <div class="rounded-md border-2 border-gray-700 bg-gray-300 w-60 h-65 mx-auto my-5 p-5">
                  <img src={c.img} class="w-60 h-36"></img>
                  <div class="mt-5 h-30">
                    <p class="font-bold text-xl font-mono">{c.name}</p>
                    <p class="font-semibold">{c.capital}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
