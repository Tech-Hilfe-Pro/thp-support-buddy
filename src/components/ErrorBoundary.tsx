import React from "react";

type State = { hasError: boolean; error?: any };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: any) { 
    super(props); 
    this.state = { hasError: false }; 
  }
  
  static getDerivedStateFromError(error: any) { 
    return { hasError: true, error }; 
  }
  
  componentDidCatch(error: any, info: any) { 
    console.error("ErrorBoundary", error, info); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-semibold mb-2">Etwas ist schiefgelaufen.</h1>
          <p className="mb-4">Bitte laden Sie die Seite neu oder kehren Sie zur Startseite zurück.</p>
          <a className="text-thp-primary underline hover:opacity-80" href="/">Zur Startseite</a>
        </div>
      );
    }
    return this.props.children;
  }
}