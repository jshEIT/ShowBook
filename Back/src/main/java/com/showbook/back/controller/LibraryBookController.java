package com.showbook.back.controller;


import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.showbook.back.dto.response.LibraryBookResponseDTO;
import com.showbook.back.security.jwt.JwtTokenUtil;
import com.showbook.back.service.LibraryBookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class LibraryBookController {
	private final JwtTokenUtil jwtTokenUtil;
	private final LibraryBookService libraryBookService;

	@PostMapping("/registration/{book_id}")
	public void createWishBook(@RequestHeader("Authorization") String token, @PathVariable(value = "book_id") Long bookId) {
		Long memberId = jwtTokenUtil.getMemberId(token);
		libraryBookService.createWishBook(memberId, bookId);
	}

	@GetMapping
	public ResponseEntity<List<LibraryBookResponseDTO>> getAllBooks(@RequestHeader("Authorization") String token, @RequestParam("read_status") int readStatus) {
		Long memberId = jwtTokenUtil.getMemberId(token);
		return new ResponseEntity<>(libraryBookService.getAllBooks(memberId, readStatus), OK);
	}
}