
export interface RackSymbol {
  char: string;
  name: string;
  description: string;
  category: string;
}

export interface RackRow {
  label: string;
  symbols: RackSymbol[];
}

export interface InsightResponse {
  title: string;
  summary: string;
  actionSteps: string[];
  philosophicalContext: string;
}
