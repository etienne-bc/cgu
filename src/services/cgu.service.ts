import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Revision } from 'src/types/revision';

@Injectable({ providedIn: 'root' })
export class CguService {
    private readonly revisions: Revision[] = [
        {
            id: 1,
            date: '2023-01-01',
            content: `
# Conditions générales d'utilisation

## Article 1 : Objet

Les présentes CGU ou Conditions Générales d'Utilisation encadrent juridiquement l’utilisation des services du site https://www.lesjoiesducode.fr.

Constituant le contrat entre la société Les Joies du Code et l’Utilisateur, l’accès au site doit être précédé de l’acceptation de ces CGU. L’accès à ce site signifie l’acceptation des présentes CGU.
            `,
        },
        {
            id: 2,
            date: '2023-09-20',
            content: `
# Conditions générales d'utilisation

## Article 1 : Objet

Les présentes CGU ou Conditions Générales d'Utilisation encadrent juridiquement l’utilisation des services du site [https://www.lesjoiesducode.fr](https://www.lesjoiesducode.fr) (ci-après dénommé « le site »).

Constituant le contrat entre la société Les Joies du Code et l’Utilisateur, l’accès au site doit être précédé de l’acceptation de ces CGU. L’accès à ce site signifie l’acceptation des présentes CGU.
            `,
        },
        {
            id: 3,
            date: '2023-10-13',
            content: `
# Conditions générales d'utilisation

## Article 1 : Objet

Les présentes CGU ou Conditions Générales d'Utilisation encadrent juridiquement l’utilisation des services du site [https://www.lesjoiesducode.fr](https://www.lesjoiesducode.fr) (ci-après dénommé « le site »).

Constituant le contrat entre la société Les Joies du Code et l’Utilisateur, l’accès au site doit être précédé de l’acceptation de ces CGU. L’accès à ce site signifie l’acceptation des présentes CGU.

## Article 2 : Mentions légales

L’édition du site [https://www.lesjoiesducode.fr](https://www.lesjoiesducode.fr) est assurée par la Société Les Joies du Code, dont le siège social est situé au 1 rue de la Paix, 75000 Paris, France, et immatriculée au numéro de SIREN 123456789.

L'hébergeur du site [https://www.lesjoiesducode.fr](https://www.lesjoiesducode.fr) est la Société Les Joies du Code, dont le siège social est situé au 1 rue de la Paix, 75000 Paris, France.
            `,
        },
    ];

    public getRevisions(): Observable<Revision[]> {
        return of(this.revisions);
    }

    public getRevision(id: number): Observable<Revision | undefined> {
        return of(this.revisions.find(revision => revision.id === id));
    }
}
