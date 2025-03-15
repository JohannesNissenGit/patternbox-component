import { RE2JS } from 're2js';

export class ExtendedRE2JS extends RE2JS {
  re2Input: RE2Input;

  constructor(pattern: string, flags: number, re2Input: RE2Input) {
    super(pattern, flags);
    this.re2Input = re2Input;
  }
}

export class RE2Input {
  expr: string;

  constructor(expr: string) {
    this.expr = expr;
  }
}
