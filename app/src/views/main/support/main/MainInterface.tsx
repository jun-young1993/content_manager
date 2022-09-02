export interface leftMenuInterface {
	name : string
	onClick : Function
	icon : React.ReactNode
	drive ?: boolean
}
export interface DashboardInterface {
	leftMenu : leftMenuInterface[]
}