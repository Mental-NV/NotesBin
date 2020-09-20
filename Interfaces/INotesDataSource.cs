namespace NotesBin.Interfaces
{
    using NotesBin.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface INotesDataSource
    {
        Task<long> AddAsync(NotesModel entry);
        Task<IEnumerable<NotesModel>> GetAllAsync();
        Task<NotesModel> GetAsync(long id);
    }
}