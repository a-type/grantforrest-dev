declare module '@njkleiner/micropub-parser' {
  interface MicroformatProperties {
    [string]: any[];
  }

  interface Microformats2 {
    type: string[];
    properties: Record<string, Microformats2>;
  }

  class MicropubRequest {
    type: string;
    action: string;
    properties: MicroformatProperties;
    commands: Record<string, any>;
    url?: string;
    update?: {
      add: MicroformatProperties;
      replace: MicroformatProperties;
      delete: MicroformatProperties;
    };
    apply(target: Microformats2): Microformats2;
  }
}
