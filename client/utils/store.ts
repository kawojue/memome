import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

const initialUserStore = {
    otp: '',
    bio: '',
    email: '',
    userId: '',
    auth: false,
    avatar: null,
    password: '',
    username: '',
    password2: '',
    loading: false,
    disabled: false,
    allowFiles: false,
    allowTexts: false,
    showLevels: false,
}

const UserStore = create<UserStoreStates>()((set) => ({
    token: undefined,
    ...initialUserStore,
    setOtp: (otp) => set({ otp }),
    setBio: (bio) => set({ bio }),
    setAuth: (auth) => set({ auth }),
    setToken: (token) => set({ token }),
    setEmail: (email) => set({ email }),
    setUserId: (userId) => set({ userId }),
    setAvatar: (avatar) => set({ avatar }),
    resetStates: () => set(initialUserStore),
    setLoading: (loading) => set({ loading }),
    setPassword: (password) => set({ password }),
    setDisabled: (disabled) => set({ disabled }),
    setUsername: (username) => set({ username }),
    setPassword2: (password2) => set({ password2 }),
    setAllowFiles: (allowFiles) => set({ allowFiles }),
    setAllowTexts: (allowTexts) => set({ allowTexts }),
    setShowLevels: (showLevels) => set({ showLevels }),
}))

const useTextEditor = create<TextEditorStates>()((set) => ({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    setIsBold: (isBold) => set({ isBold }),
    setIsItalic: (isItalic) => set({ isItalic }),
    setIsUnderline: (isUnderline) => set({ isUnderline }),
}))

const initialMessageStore = {
    progress: 0,
    sent: false,
    medias: null,
    loading: false,
    fetching: false,
    totalMessages: 0,
}

const useMessageStore = create<MessageStoreStates>()((set) => ({
    ...initialMessageStore,
    setSent: (sent) => set({ sent }),
    setMedias: (medias) => set({ medias }),
    setLoading: (loading) => set({ loading }),
    resetStates: () => set(initialMessageStore),
    setFetching: (fetching) => set({ fetching }),
    setProgress: (progress) => set({ progress }),
    setTotalMessages: (totalMessages) => set({ totalMessages }),
}))

const useModalStore = create<ModalStates>()((set) => ({
    loading: false,
    avatarModal: false,
    sharePollModal: false,
    shareLinkModal: false,
    createPollModal: false,
    pollExpiryModal: false,
    deleteAccountModal: false,
    setLoading: (loading) => set({ loading }),
    setAvatarModal: (avatarModal) => set({ avatarModal }),
    setShareLinkModal: (shareLinkModal) => set({ shareLinkModal }),
    setSharePollModal: (sharePollModal) => set({ sharePollModal }),
    setCreatePollModal: (createPollModal) => set({ createPollModal }),
    setPollExpiryModal: (pollExpiryModal) => set({ pollExpiryModal }),
    setDeleteAccountModal: (deleteAccountModal) => set({ deleteAccountModal }),
}))


const pollInitialState = {
    title: '',
    medias: null,
    options: [
        { id: uuid(), option: '' },
        { id: uuid(), option: '' },
    ],
}

const usePoll = create<Poll>()((set) => ({
    title: '',
    pollUrl: '',
    medias: null,
    expiry: null,
    isOwner: false,
    hosting: false,
    fetching: false,
    poll: undefined,
    pollLoad: false,
    totalPolls: 0,
    isAuthenticated: false,
    options: [
        { id: uuid(), option: '' },
        { id: uuid(), option: '' },
    ],
    setPoll: (poll) => set({ poll }),
    setTitle: (title) => set({ title }),
    setMedias: (medias) => set({ medias }),
    setExpiry: (expiry) => set({ expiry }),
    setIsOwner: (isOwner) => set({ isOwner }),
    setPollUrl: (pollUrl) => set({ pollUrl }),
    setHosting: (hosting) => set({ hosting }),
    setOptions: (options) => set({ options }),
    setPollLoad: (pollLoad) => set({ pollLoad }),
    setFetching: (fetching) => set({ fetching }),
    setPollToDefault: () => set(pollInitialState),
    setTotalPolls: (totalPolls) => set({ totalPolls }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))

export {
    UserStore, useTextEditor, useModalStore,
    useMessageStore, usePoll,
}