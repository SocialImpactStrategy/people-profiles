from yaml import load
from slugify import slugify
from collections import defaultdict
from staticjinja import make_site


def slugy(x):
    return slugify(x.decode('utf-8')).encode('ascii').lower()


def loadAcademyData():
    ctx = {'people': [], 'filters': defaultdict(set)}

    for person in load(open('data/people.yaml')):
        person['filters'] = set()

        if person['year']:
            person['filters'].add(str(person['year']))

            ctx['filters']['year'].add(str(person['year']))

        if person['affiliation']:
            aux = person['affiliation']

            if aux == 'PSIH Fellow, Staff':
                aux = 'Staff'

            person['filters'].add(slugy(aux))

            ctx['filters']['affiliation'].add(aux)

        if person['impact_areas']:
            lst = [slugy(x) for x in person['impact_areas']]

            person['filters'].update(lst)

            ctx['filters']['impact_areas'].update(person['impact_areas'])

        if person['expertise']:
            person['filters'].update([slugy(x) for x in person['expertise']])

            ctx['filters']['expertise'].update(person['expertise'])

        if person['geographic_interest']:
            val = person['geographic_interest']

            person['filters'].update([slugy(x) for x in val])

            ctx['filters']['geographic_interest'].update(val)

        person['filters'] = ' '.join(person['filters'])

        ctx['people'].append(person)

    for key in ctx['filters'].keys():
        ctx['filters'][key] = sorted(list(ctx['filters'][key]))

    ctx['people'].sort(key=lambda x: x['name'])
    ctx['people'].sort(key=lambda x: x['last'])

    return ctx


site = make_site(
    filters={'slugy': lambda x: slugy(x)},
    staticpaths=['static', '../data'],
    contexts=[(r'.*.html', loadAcademyData)]
)


site.render(use_reloader=True)
