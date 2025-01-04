import { Outlet } from '@remix-run/react';
import Footer from '~/components/navs/Footer';
import Header from '~/components/navs/Header';

export default function MainPageLayout(): JSX.Element {
	return (
		<div className="flex flex-col min-h-screen">
			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
				rel="stylesheet"
			/>
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}