namespace NotesBin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using NotesBin.Interfaces;
    using NotesBin.Models;


    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesDataSource notesDataSource;

        public NotesController(INotesDataSource notesDataSource)
        {
            this.notesDataSource = notesDataSource;
        }

        // GET: api/<NotesController>
        [HttpGet]
        public async Task<IEnumerable<NotesModel>> Get()
        {
            return await notesDataSource.GetAllAsync();
        }

        // GET api/<NotesController>/5
        [HttpGet("{id}")]
        public async Task<NotesModel> Get(long id)
        {
            return await notesDataSource.GetAsync(id);
        }

        // POST api/<NotesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotesModel entry)
        {

            long newId = await notesDataSource.AddAsync(entry);
            IActionResult result = Ok(new { Id = newId });
            return await Task.FromResult(result);
        }
    }
}
