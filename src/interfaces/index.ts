export interface UserDataType {
  firstName: string
  lastName: string
  dob: string
  phone: string
  financialInstitution: string
  accountType: string
  routingNo: string
  accNo: string
  ssn: string
  branchOfService: string
}

export interface UserBasicDataType {
  username: string
  userId: string
  userEmail: string
  access_token: string
}

export type authType = {
  authLoader: boolean
  isLoggedIn: boolean
  user: UserBasicDataType
  token: string
  uid: string
  userTheme: '' | 'light' | 'dark'
}

export interface HomeLayoutProps {
  children: React.ReactNode
  noScroll: boolean
  showHeader?: boolean
  backHeader?: boolean
  headerTitle?: string
  floatingButton?: boolean
  floatingButtonComponent?: React.ReactNode
  floatingButtonOnPress?: () => void
  showSearchOnHeader?: boolean
}

export interface NoteType {
  id: string
  title: string
  details: string
  owner_id: string
  shared_with: Array<any>
  bookmarked_by: Array<any>
  created_at: string
  updated_at: string
}

export interface CustomModalType {
  visible?: boolean
  onRequestClose?: () => void
  headerText?: string
  headerIcon?: React.ReactNode
  title: string
  onPressNo?: () => void
  onPressYes?: () => void
}

export interface NoteItemType {
  note: NoteType
  index: number
}

export const dummyNotes: Array<NoteType> = [
  {
    id: '1',
    title: 'Shared Note',
    details: 'This note has been shared with you.',
    owner_id: 'another_user_id',
    shared_with: ['user_id'],
    bookmarked_by: [],
    created_at: '2023-03-14T12:00:00.000Z',
    updated_at: '2023-03-14T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Note',
    details: 'This note has been shared with you.',
    owner_id: 'another_user_id',
    shared_with: ['user_id'],
    bookmarked_by: [],
    created_at: '2023-03-14T12:00:00.000Z',
    updated_at: '2023-03-14T12:00:00.000Z',
  },
  {
    id: '3',
    title: 'Important',
    details: 'This note has been shared with you.',
    owner_id: 'another_user_id',
    shared_with: ['user_id'],
    bookmarked_by: [],
    created_at: '2023-03-14T12:00:00.000Z',
    updated_at: '2023-03-14T12:00:00.000Z',
  },

  {
    id: '4',
    title: 'Notice',
    details: 'This note has been shared with you.',
    owner_id: 'another_user_id',
    shared_with: ['user_id'],
    bookmarked_by: [],
    created_at: '2023-03-14T12:00:00.000Z',
    updated_at: '2023-03-14T12:00:00.000Z',
  },
]
