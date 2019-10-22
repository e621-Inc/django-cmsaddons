from django import template
from django.utils.text import slugify


register = template.Library()


@register.simple_tag(takes_context=True)
def cmsaddons_page_css_classes(context):
    obj = context.get('object')
    if obj:
        return 'detailpage-{}'.format(slugify(obj._meta.model_name))
    page = getattr(context['request'], 'current_page', None)
    if page:
        slug = page.reverse_id
        if not slug:
            slug = page.get_slug(language='de')
        return 'cmspage-{}'.format(slug)
    return ''
