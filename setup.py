from __future__ import unicode_literals

import os
from setuptools import find_packages, setup


version = __import__('cmsaddons').__version__


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


setup(
    name="django-cmsaddons",
    version=version,
    url='http://github.com/rouxcode/django-cmsaddons',
    license='MIT',
    platforms=['OS Independent'],
    description='Django CMS addons',
    long_description=read('README.rst'),
    author=u'Alaric Maegerle',
    author_email='info@rouxcode.ch',
    packages=find_packages(exclude=['testproject', 'testproject.*']),
    install_requires=(
        'Django>=2.1,<2.3',
        'django-cms>=3.7,<3.8',
        'djangocms-admin-style==1.4.0',
        'django-libsass>=0.7',
    ),
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet :: WWW/HTTP',
    ],
)
