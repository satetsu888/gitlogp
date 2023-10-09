import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('gitlogp.terminal', () => {
		const editor = vscode.window.activeTextEditor;
        if (!editor) {
			vscode.window.showWarningMessage('no current editor');
            return;
        }	

		const currentFilePath = editor.document.uri.path;
		if (currentFilePath === undefined) {
			vscode.window.showWarningMessage('no current file');
			return;
		}

		let t = vscode.window.activeTerminal;
		if (t === undefined) {
			t = vscode.window.createTerminal();
		}
		vscode.commands.executeCommand("workbench.action.terminal.focus");
		t.sendText(`git log -p ${currentFilePath}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
