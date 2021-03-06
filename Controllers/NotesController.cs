﻿namespace NotesBin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.InteropServices.ComTypes;
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

        // GET: api/Notes
        [HttpGet]
        public async Task<IEnumerable<NotesModel>> Get()
        {
            return await notesDataSource.GetAllAsync();
        }

        // GET api/Notes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var result = await notesDataSource.GetAsync(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("The notes not found");
        }

        // POST api/Notes
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotesModel entry)
        {
            entry.Created = DateTime.UtcNow;
            long newId = await notesDataSource.AddAsync(entry);
            IActionResult result = Ok(new { Id = newId });
            return await Task.FromResult(result);
        }
    }
}
