package com.showbook.back.repository;

import com.showbook.back.entity.LibraryBook;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface LibraryBookRepository extends JpaRepository<LibraryBook,Long> {

    @Query("SELECT lb "
            + "FROM LibraryBook lb "
            + "JOIN FETCH lb.library l "
            + "WHERE l.libraryId = :libraryId "
            + "AND lb.readStatus = 2")
    List<LibraryBook> findLibraryBookByCategory(Long libraryId);

    @Query("SELECT lb "
            + "FROM LibraryBook lb "
            + "JOIN FETCH lb.library l "
            + "WHERE l.libraryId = :libraryId "
            + "AND YEAR(lb.finishedDate) = :year "
            + "AND lb.readStatus = 2 "
            + "ORDER BY lb.finishedDate")
    List<LibraryBook> findLibraryBookByFinishedDate(Long libraryId, int year);

    @Query("SELECT lb "
        + "FROM LibraryBook lb "
        + "JOIN FETCH lb.library l "
        + "WHERE l.libraryId = :libraryId "
        + "AND lb.readStatus = :readStatus ")
    List<LibraryBook> findLibraryBooksByLibraryIdAndReadStatus(Long libraryId, int readStatus);

            @Query("SELECT lb "
        + "FROM LibraryBook lb "
        + "JOIN FETCH lb.library l "
        + "JOIN FETCH lb.book b "
        + "WHERE l.libraryId = :libraryId "
        + "AND b.bookId = :bookId ")
    Optional<LibraryBook> findLibraryBookByLibraryIdAndBookId(Long libraryId, Long bookId);

    List<LibraryBook> findAllByLibrary_LibraryId(Long libraryId);
    List<LibraryBook> findAllByLibrary_LibraryIdAndBook_TitleContaining(Long libraryId, String title);
}