import {Markup} from "telegraf";

export function actionButtons() {
  return  Markup.keyboard(
    [ 
      Markup.button.callback("create todo", "create"),
      Markup.button.callback("todo list", "list"),
      Markup.button.callback("done todo", "done"),
      Markup.button.callback("edit todo", "edit"),
      Markup.button.callback("delete todo", "delete")
    ],
    {
      columns: 3
    }
  )
}
