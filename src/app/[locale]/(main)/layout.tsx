import { Main } from '@/templates/Main';

export default function Layout(props: { children: React.ReactNode }) {
  return <Main>{props.children}</Main>;
}
