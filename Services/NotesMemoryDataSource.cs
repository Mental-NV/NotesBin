namespace NotesBin.Services
{
    using NotesBin.Interfaces;
    using NotesBin.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class NotesMemoryDataSource : INotesDataSource
    {
        private readonly Dictionary<long, NotesModel> repository = new Dictionary<long, NotesModel>();

        public async Task<IEnumerable<NotesModel>> GetAllAsync()
        {
            return await Task.FromResult(repository.Values);
        }

        public async Task<NotesModel> GetAsync(long id)
        {
            if (repository.TryGetValue(id, out NotesModel result))
            {
                return await Task.FromResult(result);
            }
            return await Task.FromResult<NotesModel>(null);
        }

        public async Task<long> AddAsync(NotesModel entry)
        {
            if (entry == null)
            {
                throw new ArgumentNullException();
            }
            if (string.IsNullOrWhiteSpace(entry.Title))
            {
                throw new ArgumentException("Title musn't be empty", nameof(entry.Title));
            }
            if (string.IsNullOrWhiteSpace(entry.Content))
            {
                throw new ArgumentException("Content musn't be empty", nameof(entry.Content));
            }

            entry.Id = repository.Count;
            entry.Created = DateTime.UtcNow;
            repository.Add(entry.Id, entry);
            return await Task.FromResult(entry.Id);
        }
    }
}
