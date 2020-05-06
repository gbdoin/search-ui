import { exportGlobally } from '../../GlobalExports';
import { Component } from '../Base/Component';
import { IComponentBindings } from '../Base/ComponentBindings';
import { QueryEvents, Initialization, $$ } from '../../Core';
import { IQuerySuccessEventArgs } from '../../events/QueryEvents';
import { IQueryAnswerResponse } from '../../rest/QueryAnswerResponse';

export interface ISmartSnippetOptions {}

export class SmartSnippet extends Component {
  static ID = 'SmartSnippet';

  static options: ISmartSnippetOptions = {};

  static doExport = () => {
    exportGlobally({
      SmartSnippet
    });
  };

  constructor(public element: HTMLElement, public options?: ISmartSnippetOptions, bindings?: IComponentBindings) {
    super(element, SmartSnippet.ID, bindings);
    this.bind.onRootElement(QueryEvents.querySuccess, (data: IQuerySuccessEventArgs) => this.handleQuerySuccess(data));
  }

  private handleQuerySuccess(data: IQuerySuccessEventArgs) {
    $$(this.element).empty();
    const { questionAnswer } = data.results;
    if (!questionAnswer) {
      return;
    }
    this.render(questionAnswer);
  }

  private render(questionAnswer: IQueryAnswerResponse) {
    this.element.innerHTML = questionAnswer.answerSnippet;
  }
}
Initialization.registerAutoCreateComponent(SmartSnippet);
