package com.example.mypackage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.mypackage.domain.Superior;

import com.example.mypackage.repository.SuperiorRepository;
import com.example.mypackage.web.rest.errors.BadRequestAlertException;
import com.example.mypackage.web.rest.util.HeaderUtil;
import com.example.mypackage.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Superior.
 */
@RestController
@RequestMapping("/api")
public class SuperiorResource {

    private final Logger log = LoggerFactory.getLogger(SuperiorResource.class);

    private static final String ENTITY_NAME = "superior";

    private final SuperiorRepository superiorRepository;

    public SuperiorResource(SuperiorRepository superiorRepository) {
        this.superiorRepository = superiorRepository;
    }

    /**
     * POST  /superiors : Create a new superior.
     *
     * @param superior the superior to create
     * @return the ResponseEntity with status 201 (Created) and with body the new superior, or with status 400 (Bad Request) if the superior has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/superiors")
    @Timed
    public ResponseEntity<Superior> createSuperior(@Valid @RequestBody Superior superior) throws URISyntaxException {
        log.debug("REST request to save Superior : {}", superior);
        if (superior.getId() != null) {
            throw new BadRequestAlertException("A new superior cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Superior result = superiorRepository.save(superior);
        return ResponseEntity.created(new URI("/api/superiors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /superiors : Updates an existing superior.
     *
     * @param superior the superior to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated superior,
     * or with status 400 (Bad Request) if the superior is not valid,
     * or with status 500 (Internal Server Error) if the superior couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/superiors")
    @Timed
    public ResponseEntity<Superior> updateSuperior(@Valid @RequestBody Superior superior) throws URISyntaxException {
        log.debug("REST request to update Superior : {}", superior);
        if (superior.getId() == null) {
            return createSuperior(superior);
        }
        Superior result = superiorRepository.save(superior);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, superior.getId().toString()))
            .body(result);
    }

    /**
     * GET  /superiors : get all the superiors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of superiors in body
     */
    @GetMapping("/superiors")
    @Timed
    public ResponseEntity<List<Superior>> getAllSuperiors(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Superiors");
        Page<Superior> page = superiorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/superiors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /superiors/:id : get the "id" superior.
     *
     * @param id the id of the superior to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the superior, or with status 404 (Not Found)
     */
    @GetMapping("/superiors/{id}")
    @Timed
    public ResponseEntity<Superior> getSuperior(@PathVariable Long id) {
        log.debug("REST request to get Superior : {}", id);
        Superior superior = superiorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(superior));
    }

    /**
     * DELETE  /superiors/:id : delete the "id" superior.
     *
     * @param id the id of the superior to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/superiors/{id}")
    @Timed
    public ResponseEntity<Void> deleteSuperior(@PathVariable Long id) {
        log.debug("REST request to delete Superior : {}", id);
        superiorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
