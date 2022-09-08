import Head from 'next/head'
import colors from 'ui/theme/colors'


type MetaProps = {
	title?: string
	description?: string
}

const Meta = (props: MetaProps) => (
	<Head>
		<title>{props.title || "We Boo: Pusat anime terkeren"}</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta name='apple-mobile-web-app-title' content='We Boo' />
		<meta name='application-name' content='We Boo' />
		<meta name='description' content={props.description || 'Pusat anime terkeren'} />
		<meta
			name='theme-color'
			content={colors.surface}
			media='(prefers-color-scheme: dark)'
		/>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0 viewport-fit=cover'
		/>
		<meta name='apple-mobile-web-app-status-bar-style' content="default" />
		<link rel='apple-touch-icon' href='/icons/icon-512x512.png' />
		<link rel='icon' type='image/png' href='/favicon.ico' />
		<link rel='manifest' href='/manifest.webmanifest' />
	</Head>
)

export default Meta
