package com.soloteam.taskmanagerbe.controller;

import com.soloteam.taskmanagerbe.entity.Task;
import com.soloteam.taskmanagerbe.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks") // Base path for all task-related endpoints
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // GET all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // GET a single task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.map(ResponseEntity::ok) // If found, return 200 OK with the task
                   .orElseGet(() -> ResponseEntity.notFound().build()); // If not found, return 404 Not Found
    }

    // POST (create) a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        // Ensure the ID is null so the database generates a new one
        task.setId(null);
        return taskRepository.save(task);
    }

    // PUT (update) an existing task by ID
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTitle(taskDetails.getTitle());
            existingTask.setDescription(taskDetails.getDescription());
            existingTask.setCompleted(taskDetails.isCompleted());
            Task updatedTask = taskRepository.save(existingTask);
            return ResponseEntity.ok(updatedTask); // Return 200 OK with the updated task
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if task doesn't exist
        }
    }

    // DELETE a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Return 204 No Content on successful deletion
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if task doesn't exist
        }
    }
}
