package com.example.mypackage.repository;

import com.example.mypackage.domain.Superior;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Superior entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuperiorRepository extends JpaRepository<Superior, Long> {

}
