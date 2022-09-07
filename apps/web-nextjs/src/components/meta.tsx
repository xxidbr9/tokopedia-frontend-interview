import Head from 'next/head'
import colors from 'ui/theme/colors'

const Meta = () => (
	<Head>
		<title>We Boo: Pusat anime terkeren</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta name='apple-mobile-web-app-title' content='We Boo' />
		<meta name='application-name' content='We Boo' />
		<meta name='description' content='Pusat anime terkeren' />
		<meta
			name='theme-color'
			content='#111111'
			media='(prefers-color-scheme: dark)'
		/>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
		/>
		<link rel='apple-touch-icon' href='/icons/icon-512x512.png' />
		<link rel='icon' type='image/png' href='/favicon.ico' />
		<link rel='manifest' href='/manifest.webmanifest' />
	</Head>
)

export default Meta
