"""Setup file for shared-libs package"""

from setuptools import setup, find_packages

setup(
    name="xerobookz-shared-libs",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "pydantic>=2.0.0",
        "fastapi>=0.104.0",
        "sqlalchemy>=2.0.0",
        "psycopg2-binary>=2.9.0",
        "motor>=3.3.0",
        "redis>=5.0.0",
        "pyjwt>=2.8.0",
        "python-multipart>=0.0.6",
        "aio-pika>=9.0.0",
        "python-dotenv>=1.0.0",
    ],
)

