package com.soloteam.taskmanagerbe.repository;

import com.soloteam.taskmanagerbe.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
