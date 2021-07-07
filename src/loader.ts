import { Hotjar } from './types';

export class Loader
{
  private api: Hotjar | undefined;
  private loader: Promise<Hotjar> | undefined;
  private resolve: (api: Hotjar) => void;
	private reject: (err: Error) => void;

	constructor(private hjid: string, private hjsv: string) {
		if (typeof window === 'undefined') {
			throw new Error('hotjar is supported only in browser environment');
		}
	}

  public load(): Promise<Hotjar> {
    if (typeof this.api !== 'undefined') {
			return Promise.resolve(this.api);
		}

		if (typeof this.loader !== 'undefined') {
			return this.loader;
		}

    return this.loader = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;

      if (window['hj']) {
        resolve(window['hj']);
        return;
      }

      window['hj'] = window['hj'] || function() {
        (window['hj'].q = window['hj'].q || []).push(arguments);
      };

      window['_hjSettings'] = { hjid: this.hjid, hjsv: this.hjsv };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = !0;

      script.src = 'https://static.hotjar.com/c/hotjar-' +
        window['_hjSettings'].hjid +
        '.js?sv=' +
        window['_hjSettings'].hjsv;

      script.onload = () => {
        resolve(window['hj'] as unknown as Hotjar);
      };
      script.onerror = (error) => {
        reject(error)
      }

      const head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
		});
  }
}
