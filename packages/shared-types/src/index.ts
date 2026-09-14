export type WidgetInputs = Record<string, unknown>;

export interface OpenModalOptions {
  readonly inputs?: WidgetInputs;
  readonly modalOptions?: object;
}

export interface CustomHostSdk {
  openModal<TResult = void>(
    widgetId: string,
    options: OpenModalOptions,
  ): Promise<TResult | undefined>;
}
