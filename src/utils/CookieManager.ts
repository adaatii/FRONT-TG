import Cookies, { CookieSetOptions } from 'universal-cookie';

class CookieManager {
    private cookies: Cookies;
    private options: CookieSetOptions = {};
    private token: string = "";

    public constructor(options: CookieSetOptions | null = null) {
        this.cookies = new Cookies();
        this.options = options ?? {
            path: "/",
        };
    }

    public removeCookie(name: string) {
        this.cookies.remove(name);
    }

    public get Token(): string {
        if (this.token === "") {
            this.token = this.cookies.get("token");
            return this.token;
        } else return this.token;
    }

    public set Token(value: string) {
        this.cookies.set("token", value, this.options);
        this.token = value;
    }

}

export default CookieManager;