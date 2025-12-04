from logging.config import fileConfig
from sqlalchemy import create_engine, pool
from alembic import context
import os


from models import Base

config = context.config


fileConfig(config.config_file_name)


DATABASE_URL = os.getenv("DATABASE_URL")


target_metadata = Base.metadata

def run_migrations_online():
    connectable = create_engine(DATABASE_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

run_migrations_online()
