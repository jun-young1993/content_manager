export interface DrawerClickEvent {
	setMainContainer : (mainContainer : React.ReactNode) => void
}
export interface leftMenuInterface {
	name : string
	onClick : (event : DrawerClickEvent) => void
	icon : React.ReactNode
	drive ?: boolean
}

export interface DashboardInterface {
	leftMenu : leftMenuInterface[]
}