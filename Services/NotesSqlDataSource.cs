namespace NotesBin.Services
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Data.Sqlite;
    using NotesBin.Interfaces;
    using NotesBin.Models;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    public class NotesSqlDataSource : INotesDataSource
    {
        private readonly SqliteConnectionStringBuilder connectionStringBuilder;

        public NotesSqlDataSource(IWebHostEnvironment env)
        {
            connectionStringBuilder = new SqliteConnectionStringBuilder
            {
                DataSource = Path.Combine(env.ContentRootPath, "App_Data/SqliteDB.db")
            };
            CreateDbIfNotExists();
        }

        private void CreateDbIfNotExists()
        {
            using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText =
@"CREATE TABLE IF NOT EXISTS 'Notes' (
    'Id'	INTEGER NOT NULL UNIQUE,
    'Title'	TEXT NOT NULL,
    'Content'	TEXT NOT NULL,
    'Created'	TEXT NOT NULL,
    PRIMARY KEY('Id' AUTOINCREMENT)
);";
            command.ExecuteNonQuery();
        }

        public async Task<long> AddAsync(NotesModel entry)
        {
            using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
            await connection.OpenAsync();

            var command = connection.CreateCommand();
            command.CommandText =
@"INSERT INTO Notes (Title, Content, Created) VALUES(@Title, @Content, @Created);
SELECT last_insert_rowid();";
            command.Parameters.Add(new SqliteParameter("@Title", SqliteType.Text)).Value = entry.Title;
            command.Parameters.Add(new SqliteParameter("@Content", SqliteType.Text)).Value = entry.Content;
            command.Parameters.Add(new SqliteParameter("@Created", SqliteType.Text)).Value = entry.Created.ToString("s");
            long id = (long)await command.ExecuteScalarAsync();
            return id;
        }

        public async Task<IEnumerable<NotesModel>> GetAllAsync()
        {
            List<NotesModel> result = new List<NotesModel>();

            using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
            await connection.OpenAsync();

            var command = connection.CreateCommand();
            command.CommandText = "SELECT Id, Title, Content, Created FROM Notes";
            SqliteDataReader reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                long id = reader.GetInt64(0);
                string title = reader.GetString(1);
                string content = reader.GetString(2);
                DateTime.TryParse(reader.GetString(3), out DateTime created);

                result.Add(new NotesModel() { Id = id, Title = title, Content = content, Created = created });
            }

            return result;
        }

        public async Task<NotesModel> GetAsync(long id)
        {
            using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
            await connection.OpenAsync();

            var command = connection.CreateCommand();
            command.CommandText = "SELECT Title, Content, Created FROM Notes WHERE Id = @Id";
            command.Parameters.Add(new SqliteParameter("@Id", SqliteType.Integer)).Value = id;
            SqliteDataReader reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                string title = reader.GetString(0);
                string content = reader.GetString(1);
                DateTime.TryParse(reader.GetString(2), out DateTime created);

                return new NotesModel() { Id = id, Title = title, Content = content, Created = created };
            }

            return null;
        }
    }
}
