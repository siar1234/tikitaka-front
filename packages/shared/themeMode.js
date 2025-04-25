export function themeModeOnWeb() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}