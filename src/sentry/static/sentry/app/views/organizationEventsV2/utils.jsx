import {ALL_VIEWS, SPECIAL_FIELDS} from './data';

/**
 * Given a view id, return the corresponding view object
 *
 * @param {String} requestedView
 * @returns {Object}
 *
 */
export function getCurrentView(requestedView) {
  return ALL_VIEWS.find(view => view.id === requestedView) || ALL_VIEWS[0];
}

/**
 * Takes a view and converts it into the format required for the events API
 *
 * @param {Object} view
 * @returns {Object}
 */
export function getQuery(view) {
  const data = {...view.data};
  const fields = data.fields.reduce((list, field) => {
    if (SPECIAL_FIELDS.hasOwnProperty(field)) {
      list.push(...SPECIAL_FIELDS[field].fields);
    } else {
      list.push(field);
    }
    return list;
  }, []);

  data.field = [...new Set(fields)];

  return data;
}

/**
 * Return a location object for the current pathname
 * with a query string reflected the provided tag.
 *
 * @param {Object} tag containing key/value properties
 * @param {Object} browser location object.
 * @return {Object} router target
 */
export function eventTagSearchUrl(tag, location) {
  const query = {...location.query};
  // Add tag key/value to search
  if (query.query) {
    query.query += ` ${tag.key}:"${tag.value}"`;
  } else {
    query.query = `${tag.key}:"${tag.value}"`;
  }
  // Remove the event slug so the user sees new search results.
  delete query.eventSlug;

  return {
    pathname: location.pathname,
    query,
  };
}