export {Transport, LSPClient, LSPClientConfig, LSPClientExtension, WorkspaceMapping} from "./client"
export {LSPPlugin} from "./plugin"
export {Workspace, WorkspaceFile} from "./workspace"
export {serverCompletion, serverCompletionSource} from "./completion"
export {hoverTooltips} from "./hover"
export {formatDocument, formatKeymap} from "./formatting"
export {renameSymbol, renameKeymap} from "./rename"
export {signatureHelp, nextSignature, prevSignature, showSignatureHelp, signatureKeymap} from "./signature"
export {jumpToDefinition, jumpToDeclaration, jumpToTypeDefinition, jumpToImplementation, jumpToDefinitionKeymap} from "./definition"
export {findReferences, closeReferencePanel, findReferencesKeymap} from "./references"
export {serverDiagnostics} from "./diagnostics"

import {Extension} from "@codemirror/state"
import {keymap} from "@codemirror/view"
import {LSPClient, LSPClientExtension} from "./client"
import {LSPPlugin} from "./plugin"
import {serverCompletion} from "./completion"
import {hoverTooltips} from "./hover"
import {formatKeymap} from "./formatting"
import {renameKeymap} from "./rename"
import {signatureHelp} from "./signature"
import {jumpToDefinitionKeymap} from "./definition"
import {findReferencesKeymap} from "./references"
import {serverDiagnostics} from "./diagnostics"

/// Returns an extension that enables the [LSP
/// plugin](#lsp-client.LSPPlugin) as well as LSP based
/// autocompletion, hover tooltips, and signature help, along with the
/// keymaps for reformatting, renaming symbols, jumping to definition,
/// and finding references.
///
/// This function is deprecated. Prefer to directly use
/// [`LSPPlugin.create`](#lsp-client.LSPPlugin^create) and either add
/// the extensions you need directly, or configure them in the client
/// via [`languageServerExtensions`](#lsp-client.languageServerExtensions).
export function languageServerSupport(client: LSPClient, uri: string, languageID?: string): Extension {
  return [
    LSPPlugin.create(client, uri, languageID),
    serverCompletion(),
    hoverTooltips(),
    keymap.of([...formatKeymap, ...renameKeymap, ...jumpToDefinitionKeymap, ...findReferencesKeymap]),
    signatureHelp(),
  ]
}

/// This function bundles all the extensions defined in this package,
/// in a way that can be passed to the
/// [`extensions`](#lsp-client.LSPClientConfig.extensions) option to
/// `LSPClient`.
export function languageServerExtensions(): readonly (Extension | LSPClientExtension)[] {
  return [
    serverCompletion(),
    hoverTooltips(),
    keymap.of([...formatKeymap, ...renameKeymap, ...jumpToDefinitionKeymap, ...findReferencesKeymap]),
    signatureHelp(),
    serverDiagnostics()
  ]
}
