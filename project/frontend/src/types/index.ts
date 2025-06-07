// IDE-Agent HINT: Frontend TypeScript Tip Tanımları - Uygulama genelinde kullanılan tipler

// Base Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export interface User extends BaseEntity {
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  preferences: UserPreferences;
  role: UserRole;
}

export interface UserPreferences {
  theme: ThemeMode;
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  autoSave: boolean;
  autoSaveDelay: number;
  keyboardShortcuts: Record<string, string>;
  language: string;
  timezone: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// Theme Types
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  HIGH_CONTRAST = 'high-contrast',
  AUTO = 'auto'
}

export interface ThemeConfig {
  mode: ThemeMode;
  customColors?: Record<string, string>;
  customFonts?: Record<string, string>;
}

// File System Types
export interface FileSystemItem {
  id: string;
  name: string;
  path: string;
  type: FileSystemItemType;
  size?: number;
  lastModified?: Date;
  isHidden?: boolean;
  permissions?: FilePermissions;
  children?: FileSystemItem[];
  parent?: string;
}

export enum FileSystemItemType {
  FILE = 'file',
  DIRECTORY = 'directory',
  SYMLINK = 'symlink'
}

export interface FilePermissions {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface FileContent {
  path: string;
  content: string;
  encoding: string;
  language: string;
  size: number;
  lastModified: Date;
}

// Editor Types
export interface EditorTab {
  id: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isModified: boolean;
  isActive: boolean;
  cursorPosition: CursorPosition;
  scrollPosition: ScrollPosition;
  selections: Selection[];
  viewState?: any; // Monaco editor view state
}

export interface CursorPosition {
  line: number;
  column: number;
}

export interface ScrollPosition {
  scrollTop: number;
  scrollLeft: number;
}

export interface Selection {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface EditorConfig {
  theme: string;
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  lineNumbers: 'on' | 'off' | 'relative' | 'interval';
  minimap: boolean;
  folding: boolean;
  autoIndent: 'none' | 'keep' | 'brackets' | 'advanced' | 'full';
  formatOnSave: boolean;
  formatOnPaste: boolean;
  formatOnType: boolean;
}

// Terminal Types
export interface Terminal {
  id: string;
  name: string;
  cwd: string;
  shell: string;
  isActive: boolean;
  process?: TerminalProcess;
  history: TerminalHistoryItem[];
  environment: Record<string, string>;
}

export interface TerminalProcess {
  pid: number;
  command: string;
  args: string[];
  status: ProcessStatus;
  startTime: Date;
  endTime?: Date;
  exitCode?: number;
}

export enum ProcessStatus {
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  KILLED = 'killed'
}

export interface TerminalHistoryItem {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
  exitCode?: number;
  duration: number;
}

// AI Assistant Types
export interface AIAssistant {
  id: string;
  name: string;
  model: string;
  capabilities: AICapability[];
  isActive: boolean;
  configuration: AIConfiguration;
}

export enum AICapability {
  CODE_COMPLETION = 'code_completion',
  CODE_EXPLANATION = 'code_explanation',
  CODE_GENERATION = 'code_generation',
  CODE_REVIEW = 'code_review',
  DEBUGGING = 'debugging',
  REFACTORING = 'refactoring',
  DOCUMENTATION = 'documentation',
  TESTING = 'testing',
  CHAT = 'chat'
}

export interface AIConfiguration {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt?: string;
  customInstructions?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  attachments?: AIAttachment[];
}

export interface AIAttachment {
  type: 'file' | 'image' | 'code' | 'error';
  name: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isArchived: boolean;
}

// Model Hub Types
export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  type: ModelType;
  format: ModelFormat;
  size: number;
  downloadUrl: string;
  homepage?: string;
  repository?: string;
  license: string;
  tags: string[];
  capabilities: string[];
  requirements: ModelRequirements;
  metrics: ModelMetrics;
  status: ModelStatus;
  isLocal: boolean;
  localPath?: string;
  downloadProgress?: number;
  lastUsed?: Date;
}

export enum ModelType {
  LLM = 'llm',
  VISION = 'vision',
  AUDIO = 'audio',
  MULTIMODAL = 'multimodal',
  EMBEDDING = 'embedding',
  CLASSIFICATION = 'classification',
  GENERATION = 'generation'
}

export enum ModelFormat {
  GGUF = 'gguf',
  SAFETENSORS = 'safetensors',
  PYTORCH = 'pytorch',
  TENSORFLOW = 'tensorflow',
  ONNX = 'onnx',
  HUGGINGFACE = 'huggingface'
}

export enum ModelStatus {
  AVAILABLE = 'available',
  DOWNLOADING = 'downloading',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
  NOT_FOUND = 'not_found'
}

export interface ModelRequirements {
  minRam: number;
  minVram?: number;
  minDiskSpace: number;
  supportedPlatforms: string[];
  pythonVersion?: string;
  dependencies: string[];
}

export interface ModelMetrics {
  accuracy?: number;
  perplexity?: number;
  bleuScore?: number;
  inferenceSpeed?: number;
  memoryUsage?: number;
  benchmarkScores: Record<string, number>;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  path: string;
  type: ProjectType;
  language: string;
  framework?: string;
  version: string;
  dependencies: ProjectDependency[];
  scripts: Record<string, string>;
  configuration: ProjectConfiguration;
  gitRepository?: GitRepository;
  lastOpened: Date;
  isActive: boolean;
}

export enum ProjectType {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  CSHARP = 'csharp',
  CPP = 'cpp',
  RUST = 'rust',
  GO = 'go',
  PHP = 'php',
  RUBY = 'ruby',
  OTHER = 'other'
}

export interface ProjectDependency {
  name: string;
  version: string;
  type: 'production' | 'development' | 'peer' | 'optional';
  source: string;
}

export interface ProjectConfiguration {
  buildCommand?: string;
  startCommand?: string;
  testCommand?: string;
  lintCommand?: string;
  formatCommand?: string;
  outputDirectory?: string;
  sourceDirectory?: string;
  excludePatterns: string[];
  includePatterns: string[];
}

export interface GitRepository {
  url: string;
  branch: string;
  remotes: GitRemote[];
  status: GitStatus;
  lastCommit?: GitCommit;
}

export interface GitRemote {
  name: string;
  url: string;
  type: 'fetch' | 'push';
}

export interface GitStatus {
  ahead: number;
  behind: number;
  staged: GitFileStatus[];
  unstaged: GitFileStatus[];
  untracked: string[];
  conflicted: string[];
}

export interface GitFileStatus {
  path: string;
  status: 'added' | 'modified' | 'deleted' | 'renamed' | 'copied';
  oldPath?: string;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  email: string;
  date: Date;
  parents: string[];
}

// Extension Types
export interface Extension {
  id: string;
  name: string;
  displayName: string;
  description: string;
  version: string;
  author: string;
  publisher: string;
  homepage?: string;
  repository?: string;
  license: string;
  categories: string[];
  keywords: string[];
  engines: Record<string, string>;
  activationEvents: string[];
  main?: string;
  contributes: ExtensionContributes;
  isEnabled: boolean;
  isInstalled: boolean;
  installDate?: Date;
  updateDate?: Date;
}

export interface ExtensionContributes {
  commands?: ExtensionCommand[];
  keybindings?: ExtensionKeybinding[];
  languages?: ExtensionLanguage[];
  themes?: ExtensionTheme[];
  snippets?: ExtensionSnippet[];
  grammars?: ExtensionGrammar[];
  configuration?: ExtensionConfiguration;
}

export interface ExtensionCommand {
  command: string;
  title: string;
  category?: string;
  icon?: string;
}

export interface ExtensionKeybinding {
  command: string;
  key: string;
  when?: string;
  args?: any;
}

export interface ExtensionLanguage {
  id: string;
  aliases: string[];
  extensions: string[];
  configuration?: string;
}

export interface ExtensionTheme {
  label: string;
  uiTheme: 'vs' | 'vs-dark' | 'hc-black';
  path: string;
}

export interface ExtensionSnippet {
  language: string;
  path: string;
}

export interface ExtensionGrammar {
  language: string;
  scopeName: string;
  path: string;
}

export interface ExtensionConfiguration {
  title: string;
  properties: Record<string, ExtensionConfigurationProperty>;
}

export interface ExtensionConfigurationProperty {
  type: string;
  default: any;
  description: string;
  enum?: any[];
  enumDescriptions?: string[];
}

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
  autoHide?: boolean;
  duration?: number;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface NotificationAction {
  id: string;
  label: string;
  action: () => void;
  isPrimary?: boolean;
}

// Search Types
export interface SearchQuery {
  query: string;
  caseSensitive: boolean;
  wholeWord: boolean;
  regex: boolean;
  includePatterns: string[];
  excludePatterns: string[];
  fileTypes: string[];
  maxResults: number;
}

export interface SearchResult {
  file: string;
  line: number;
  column: number;
  text: string;
  match: string;
  context: SearchContext;
}

export interface SearchContext {
  before: string[];
  after: string[];
}

// Settings Types
export interface Settings {
  general: GeneralSettings;
  editor: EditorSettings;
  terminal: TerminalSettings;
  ai: AISettings;
  extensions: ExtensionSettings;
  appearance: AppearanceSettings;
  keyboard: KeyboardSettings;
  privacy: PrivacySettings;
}

export interface GeneralSettings {
  language: string;
  autoUpdate: boolean;
  telemetry: boolean;
  crashReporting: boolean;
  autoSave: boolean;
  autoSaveDelay: number;
  confirmBeforeClosing: boolean;
  restoreWindows: boolean;
}

export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  folding: boolean;
  bracketMatching: boolean;
  autoIndent: boolean;
  formatOnSave: boolean;
  formatOnPaste: boolean;
  trimTrailingWhitespace: boolean;
  insertFinalNewline: boolean;
}

export interface TerminalSettings {
  shell: string;
  fontSize: number;
  fontFamily: string;
  cursorStyle: 'block' | 'underline' | 'bar';
  cursorBlink: boolean;
  scrollback: number;
  fastScrollSensitivity: number;
  mouseWheelScrollSensitivity: number;
}

export interface AISettings {
  enabled: boolean;
  defaultModel: string;
  autoComplete: boolean;
  inlineChat: boolean;
  codeExplanation: boolean;
  codeGeneration: boolean;
  maxTokens: number;
  temperature: number;
  apiKey?: string;
  customEndpoint?: string;
}

export interface ExtensionSettings {
  autoUpdate: boolean;
  checkUpdates: boolean;
  enabledExtensions: string[];
  disabledExtensions: string[];
  trustedExtensions: string[];
}

export interface AppearanceSettings {
  theme: ThemeMode;
  iconTheme: string;
  colorTheme: string;
  fontSize: number;
  fontFamily: string;
  density: 'compact' | 'normal' | 'comfortable';
  animations: boolean;
  transparency: number;
}

export interface KeyboardSettings {
  shortcuts: Record<string, string>;
  customShortcuts: Record<string, string>;
  enableVimMode: boolean;
  enableEmacsMode: boolean;
}

export interface PrivacySettings {
  telemetry: boolean;
  crashReporting: boolean;
  usageStatistics: boolean;
  errorReporting: boolean;
  dataCollection: boolean;
}

// API Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
  timestamp: Date;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: Date;
  id?: string;
}

export interface WebSocketEvent {
  event: string;
  data: any;
  source: string;
  timestamp: Date;
}

// Event Types
export interface AppEvent {
  type: string;
  payload: any;
  timestamp: Date;
  source: string;
}

export interface KeyboardEvent {
  key: string;
  code: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  preventDefault: () => void;
  stopPropagation: () => void;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

export interface IconProps extends BaseComponentProps {
  size?: number | string;
  color?: string;
  onClick?: () => void;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// State Management Types
export interface AppState {
  user: UserState;
  ui: UIState;
  editor: EditorState;
  terminal: TerminalState;
  ai: AIState;
  modelHub: ModelHubState;
  project: ProjectState;
  settings: SettingsState;
  notifications: NotificationState;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  theme: ThemeMode;
  sidebarVisible: boolean;
  panelVisible: boolean;
  activityBarVisible: boolean;
  statusBarVisible: boolean;
  fullscreen: boolean;
  layout: LayoutConfig;
  modals: ModalState[];
  contextMenus: ContextMenuState[];
}

export interface LayoutConfig {
  sidebarWidth: number;
  panelHeight: number;
  editorGroups: EditorGroup[];
}

export interface EditorGroup {
  id: string;
  tabs: EditorTab[];
  activeTabId: string | null;
  splitDirection?: 'horizontal' | 'vertical';
}

export interface ModalState {
  id: string;
  component: string;
  props: Record<string, any>;
  isOpen: boolean;
}

export interface ContextMenuState {
  id: string;
  x: number;
  y: number;
  items: ContextMenuItem[];
  isOpen: boolean;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
  action?: () => void;
}

export interface EditorState {
  tabs: EditorTab[];
  activeTabId: string | null;
  config: EditorConfig;
  isLoading: boolean;
  error: string | null;
}

export interface TerminalState {
  terminals: Terminal[];
  activeTerminalId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AIState {
  assistants: AIAssistant[];
  activeAssistantId: string | null;
  conversations: AIConversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ModelHubState {
  models: ModelInfo[];
  loadedModels: string[];
  downloadingModels: string[];
  isLoading: boolean;
  error: string | null;
}

export interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;
  fileSystem: FileSystemItem[];
  isLoading: boolean;
  error: string | null;
}

export interface SettingsState {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  hasUnsavedChanges: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}