import { Fragment } from "react";

/**
 * Affiche une adresse email en autorisant le retour à la ligne après chaque « . »
 * de la partie avant le « @ », et avant le « @ » lui-même, pour qu'une adresse
 * longue ne déborde pas de sa colonne sans être coupée au milieu d'un mot.
 */
export default function EmailText({ email }: { email: string }) {
  const at = email.indexOf("@");
  const local = at === -1 ? email : email.slice(0, at);
  const parts = local.split(/(?<=\.)/);
  if (at !== -1) parts.push(email.slice(at));
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
